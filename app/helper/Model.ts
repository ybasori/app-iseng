import dbs from "@app/config/db";

interface IFilter {
  [x: string]: any;
}

interface IPage {
  of: string | number;
  size: string | number;
}

interface ISort {
  by: string;
  order: "asc" | "desc";
}

export interface IPagination {
  page?: IPage;
  sort?: ISort[];
}

interface IJoin {
  name: string;
  joinType?: "leftJoin" | "rightJoin" | "join";
  filter?: IFilter;
  join?: (IJoin | string)[];
  show?: string[];
}

export interface IRelation {
  [field: string]: {
    type: "belongsTo" | "hasMany" | "hasOne";
    relatedTo: {
      database: string;
      table: string;
      localKey: string;
      foreignKey: string;
      relations?: IRelation | null;
      columns?: string[][];
    };
  };
}

/**
 * @typedef {Object<string, {
 * name: string,
 * type: "hasMany"|"hasOne"|"belongsTo",
 * relatedTo:{
 * database: string,
 * table: string,
 * localKey: string,
 * foreignKey: string,
 * relations?: IRelation}
 * }>} IRelation
 */

class Model {
  /**
   * @property {string} database
   * @property {string} table
   * @property {IRelation} [relations]
   */
  database?: string;
  table?: string;
  relations: IRelation | null = null;

  /**
   *
   * @param {Object<string, {not: string, in: string[]}|string>} filter
   * @description the outer object is based on field or column of a table
   * @property {string} not - Represents the exclusion condition
   * @property {string[]} in - it can be more than one value
   * @returns {string[]}
   */
  filterQuery(filter: IFilter, table: string): string[] {
    if (!!filter) {
      const queries = Object.keys(filter).map((key) => {
        let filterValue = filter[key];

        let not = false;
        let in_query = false;
        if (!!filterValue["not"]) {
          not = true;
          filterValue = filterValue["not"];
        }
        if (!!filterValue["in"]) {
          in_query = true;
          filterValue = `(${filterValue["in"]
            .map((item: any) => `'${item}'`)
            .join(", ")})`;
        }

        if (filterValue === "null") {
          if (not) {
            return `${table}.${key} IS NOT NULL`;
          }

          return `${table}.${key} IS NULL`;
        }

        if (in_query) {
          if (not) {
            return `${table}.${key} NOT IN ${filterValue}`;
          }
          return `${table}.${key} IN ${filterValue}`;
        }

        if (not) {
          return `${table}.${key} NOT LIKE '${filterValue}'`;
        }

        return `${table}.${key} LIKE '${filterValue}'`;
      });

      return queries;
    }

    return [];
  }

  /**
   *
   * @param {Object} pagination - Pagination
   * @param {Object} pagination.page - Page
   * @param {number} pagination.page.of - The current page number.
   * @param {number} pagination.page.size - The number of items per page.
   * @returns {string}
   */
  paginationQuery(pagination?: IPagination): string {
    if (
      !!pagination &&
      !!pagination.page &&
      !!pagination.page.of &&
      !!pagination.page.size
    ) {
      const offset =
        (Number(pagination.page.of) - 1) * Number(pagination.page.size);

      return `LIMIT ${offset}, ${pagination.page.size}`;
    }

    return "";
  }
  /**
   *
   * @param {Object} pagination
   * @param {Object[]} pagination.sort
   * @param {string} pagination.sort[].by
   * @param {"asc"|"desc"} pagination.sort[].order
   * @returns {string}
   */
  sortQuery(pagination?: IPagination): string {
    if (!!pagination && !!pagination.sort) {
        console.log(pagination.sort)
      const queries = pagination.sort
        .filter((item) => {
          if (!!item.by && !!item.order) {
            return true;
          }
          return false;
        })
        .map((sort) => {
          return `${sort.by} ${sort.order}`;
        });

      if (queries.length > 0) {
        return `ORDER BY ${queries.join(", ")}`;
      }

      return "";
    }

    return "";
  }

  joinSqlQuery(
    joinArr: IJoin[],
    relationObj: IRelation | null,
    parentTable: string
  ) {
    let sqlJoin = "";

    for (let i = 0; i < joinArr.length; i++) {
      if (!!relationObj && relationObj[joinArr[i].name].type === "belongsTo") {
        sqlJoin =
          sqlJoin +
          " " +
          (joinArr[i].joinType === "leftJoin"
            ? "LEFT JOIN"
            : joinArr[i].joinType === "rightJoin"
            ? "RIGHT JOIN"
            : "JOIN") +
          " " +
          relationObj[joinArr[i].name].relatedTo.table +
          " ON " +
          relationObj[joinArr[i].name].relatedTo.table +
          "." +
          relationObj[joinArr[i].name].relatedTo.localKey +
          " = " +
          parentTable +
          "." +
          relationObj[joinArr[i].name].relatedTo.foreignKey;
      }
      if (!!relationObj && relationObj[joinArr[i].name].type === "hasMany") {
        sqlJoin =
          sqlJoin +
          " " +
          (joinArr[i].joinType === "leftJoin"
            ? "LEFT JOIN"
            : joinArr[i].joinType === "rightJoin"
            ? "RIGHT JOIN"
            : "JOIN") +
          " " +
          relationObj[joinArr[i].name].relatedTo.table +
          " ON " +
          relationObj[joinArr[i].name].relatedTo.table +
          "." +
          relationObj[joinArr[i].name].relatedTo.foreignKey +
          " = " +
          parentTable +
          "." +
          relationObj[joinArr[i].name].relatedTo.localKey;
      }
      if (!!relationObj && relationObj[joinArr[i].name].type === "hasOne") {
        sqlJoin =
          sqlJoin +
          " " +
          (joinArr[i].joinType === "leftJoin"
            ? "LEFT JOIN"
            : joinArr[i].joinType === "rightJoin"
            ? "RIGHT JOIN"
            : "JOIN") +
          " " +
          relationObj[joinArr[i].name].relatedTo.table +
          " ON " +
          relationObj[joinArr[i].name].relatedTo.table +
          "." +
          relationObj[joinArr[i].name].relatedTo.foreignKey +
          " = " +
          parentTable +
          "." +
          relationObj[joinArr[i].name].relatedTo.localKey;
      }
    }

    return sqlJoin;
  }

  joinColumnSqlQuery(joinArr: IJoin[], relationObj: IRelation | null): string {
    let sqlJoin: any[] = [];

    for (let i = 0; i < joinArr.length; i++) {
      const name = joinArr[i].name;
      if (!!relationObj && !!relationObj[name].relatedTo.columns) {
        for (let j = 0; j < relationObj[name].relatedTo.columns.length; j++) {
          if (relationObj[name].relatedTo.columns[j].length === 1) {
            sqlJoin = [
              ...sqlJoin,
              relationObj[name].relatedTo.table +
                "." +
                relationObj[name].relatedTo.columns[j][0] +
                " AS " +
                name +
                "_" +
                relationObj[name].relatedTo.columns[j][0],
            ];
          }
          if (relationObj[name].relatedTo.columns[j].length === 2) {
            sqlJoin = [
              ...sqlJoin,
              relationObj[name].relatedTo.table +
                "." +
                relationObj[name].relatedTo.columns[j][0] +
                " AS " +
                name +
                "_" +
                relationObj[name].relatedTo.columns[j][1],
            ];
          }
        }
      }
    }

    return (sqlJoin.length > 0 ? " , " : "") + sqlJoin.join(" , ");
  }

  joinFilterSqlQuery(
    joinArr: IJoin[],
    relationObj: IRelation | null
    // parentTable: string
  ): string[] {
    let filterQuery: string[] = [];

    for (let i = 0; i < joinArr.length; i++) {
      if (!!relationObj) {
        filterQuery = [
          ...filterQuery,
          ...this.filterQuery(
            joinArr[i].filter ?? [],
            relationObj[joinArr[i].name].relatedTo.table
          ),
        ];
      }
    }

    return filterQuery;
  }

  /**
   * @typedef {object} IFilter
   * @property {string} not
   * @property {string[]} in
   */

  /**
   * @typedef {string[] | {
   * name:string,
   * join: IJoin,
   * joinType: "leftJoin"|"rightJoin"|"orm"
   * filter: {
   * [key: string]: IFilter | string
   * } }[]} IJoin
   */

  /**
   *
   * @param {Object} config
   * @param {string} [config.db]
   * @param {string} [config.table]
   * @param {{[key: string]: IFilter | string}} [config.filter]
   * @param {Object} [config.pagination]
   * @param {Object[]} [config.pagination.sort]
   * @param {string} config.pagination.sort[].by
   * @param {"asc"|"desc"} config.pagination.sort[].order
   * @param {Object} [config.pagination.page] - Page
   * @param {number} config.pagination.page.of - The current page number.
   * @param {number} config.pagination.page.size - The number of items per page.
   * @param {IJoin} [config.join]
   * @param {IRelation} [config.relations]
   * @returns
   */

  getByFilter({
    db: alternativeDb,
    table: alternativeTable,
    filter,
    pagination,
    join = [],
    relations: alternativeRelations = null,
    show = [],
  }: {
    db?: string;
    table?: string;
    filter: IFilter;
    pagination?: IPagination;
    join?: (IJoin | string)[];
    relations?: IRelation | null;
    show?: string[];
  }): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const dbi = !!alternativeDb
          ? alternativeDb
          : !!this.database
          ? this.database
          : "";
        const db = dbs[dbi as keyof typeof dbs];

        const filterQuery = this.filterQuery(
          { ...filter },
          !!alternativeTable ? alternativeTable : this.table ?? ""
        );
        const sortQuery = this.sortQuery(pagination);
        const paginationQuery = this.paginationQuery(pagination);

        const joinSql = join.filter(
          (item) =>
            typeof item !== "string" &&
            (item.joinType === "rightJoin" ||
              item.joinType === "leftJoin" ||
              item.joinType === "join")
        ) as unknown as IJoin[];

        const joinQuery = this.joinSqlQuery(
          joinSql,
          !!alternativeRelations ? alternativeRelations : this.relations,
          !!alternativeTable ? alternativeTable : this.table ?? ""
        );
        const selectJoinQuery = this.joinColumnSqlQuery(
          joinSql,
          !!alternativeRelations ? alternativeRelations : this.relations
        );
        const filterJoinQuery = this.joinFilterSqlQuery(
          joinSql,
          !!alternativeRelations ? alternativeRelations : this.relations
          // !!alternativeTable ? alternativeTable : (this.table ?? "")
        );

        const query = `SELECT ${
          !!alternativeTable ? alternativeTable : this.table
        }.* ${selectJoinQuery} FROM ${
          !!alternativeTable ? alternativeTable : this.table
        } ${joinQuery} ${
          [...filterQuery, ...filterJoinQuery].length > 0 ? "WHERE" : ""
        } ${[...filterQuery, ...filterJoinQuery].join(
          " AND "
        )} ${sortQuery} ${paginationQuery}`;

        console.log(query)

        const [mainResult] = await db.query(query);

        let joinedResult = [...(mainResult as unknown[] as any[])];

        if (!!join && joinedResult.length > 0) {
          const relations = !!alternativeRelations
            ? alternativeRelations
            : this.relations;
          const joinResult: any[] = await Promise.all(
            join.map((el) => {
              let joinName = "";
              let joinJoin: IJoin[] = [];
              let joinFilter = {};
              if (typeof el === "string") {
                joinName = el;
              } else {
                joinName = el.name;
                joinJoin = el.join as IJoin[];
                joinFilter = el.filter ?? {};
              }

              if (
                !!relations &&
                (relations[joinName].type === "hasMany" ||
                  relations[joinName].type === "hasOne")
              ) {
                return this.getByFilter({
                  db: relations[joinName].relatedTo.database,
                  table: relations[joinName].relatedTo.table,
                  filter: {
                    ...joinFilter,
                    [relations[joinName].relatedTo.foreignKey]: {
                      in: joinedResult
                        .filter(
                          (a) => !!a[relations[joinName].relatedTo.localKey]
                        )
                        .filter((a, i, s)=> s.findIndex((z)=>a===z)===i)
                        .map((a) => a[relations[joinName].relatedTo.localKey])
                        .filter((a, i, s)=> s.findIndex((z)=>a===z)===i),
                    },
                  },
                  join: joinJoin,
                  relations: !!relations[joinName].relatedTo.relations
                    ? relations[joinName].relatedTo.relations
                    : null,
                });
              }
              if (!!relations && relations[joinName].type === "belongsTo") {
                return this.getByFilter({
                  db: relations[joinName].relatedTo.database,
                  table: relations[joinName].relatedTo.table,
                  filter: {
                    ...joinFilter,
                    [relations[joinName].relatedTo.localKey]: {
                      in: joinedResult
                        .filter(
                          (a) => !!a[relations[joinName].relatedTo.foreignKey]
                        )
                        .map(
                          (a) => a[relations[joinName].relatedTo.foreignKey]
                        )
                        .filter((a, i, s)=> s.findIndex((z)=>a===z)===i),
                    },
                  },
                  join: joinJoin,
                  relations: !!relations[joinName].relatedTo.relations
                    ? relations[joinName].relatedTo.relations
                    : null,
                });
              }
              return new Promise((resolve: (arg0: never[][]) => any) =>
                resolve([[]])
              );
            })
          );

          joinedResult = [
            ...joinedResult.map((item) => {
              let dt = { ...item };
              join.forEach((el, index) => {
                let joinName = "";
                if (typeof el === "string") {
                  joinName = el;
                } else {
                  joinName = el.name;
                }
                if (!!relations && relations[joinName].type === "hasMany") {
                  const relateDt = [
                    ...joinResult[index].filter(
                      (b: { [x: string]: any }) =>
                        b[relations[joinName].relatedTo.foreignKey] ===
                        item[relations[joinName].relatedTo.localKey]
                    ),
                  ];
                  dt = { ...dt, [joinName]: relateDt };
                }
                if (!!relations && relations[joinName].type === "hasOne") {
                  const [relateDt] = [
                    ...joinResult[index].filter(
                      (b: { [x: string]: any }) =>
                        b[relations[joinName].relatedTo.foreignKey] ===
                        item[relations[joinName].relatedTo.localKey]
                    ),
                  ];
                  dt = { ...dt, [joinName]: relateDt };
                }
                if (!!relations && relations[joinName].type === "belongsTo") {
                  const [relateDt] = [
                    ...joinResult[index].filter(
                      (b: { [x: string]: any }) =>
                        b[relations[joinName].relatedTo.localKey] ===
                        item[relations[joinName].relatedTo.foreignKey]
                    ),
                  ];
                  dt = { ...dt, [joinName]: relateDt };
                }
              });

              return dt;
            }),
          ];
        }

        let jr = [...joinedResult];

        const removeUnshowed = (data: any, joinShow:string[], joinRowStr:string[], subjoin:(string | IJoin)[]) => {
            
            Object.keys(data).forEach((key) => {
                    if (
                      joinShow.length > 0 &&
                      !joinShow.includes(key) &&
                      !joinRowStr.includes(key)
                    ) {
                      delete data[key];
                    } else {
                        if(typeof data === 'object'){
                            removeUnshowedNested(data, key, subjoin);
                        }
                    }
                  });
                  return data
        }

        const removeUnshowedNested = (item:any,field:string, subjoin:(string | IJoin)[]) => {
            
              const joinRow = subjoin
                .filter((j) => typeof j !== "string")
                .find((joinItem) => joinItem.name === field);

              if (joinRow) {
                const joinShow = joinRow.show ?? [];
                const joinRowStr = (joinRow.join??[]).map((j) =>
                  typeof j !== "string" ? j.name : j
                );

                if (Array.isArray(item[field])) {
                  item[field] = item[field].map((subitem) => removeUnshowed(subitem, joinShow, joinRowStr, joinRow.join ?? []));
                } else {
                  item[field] = removeUnshowed(item[field], joinShow, joinRowStr, joinRow.join ?? []);
                }
            }

                return item;
        }

        const mj = join.map((item) => {
          if (typeof item !== "string") {
            return item.name;
          }

          return item;
        });

        jr = (joinedResult as any[]).map((item) => {
          Object.keys(item).forEach((field) => {
            if (
              show.length > 0 &&
              !show.includes(field) &&
              !mj.includes(field)
            ) {
              delete item[field];
            } else {
                if(typeof item === 'object'){
                item = removeUnshowedNested(item, field, join);
                }
            }
          });

          return item;
        });

        resolve(jr);
      } catch (err: any) {
        if (!!err.sqlMessage) {
          reject(err.sqlMessage);
        } else {
          reject(err);
        }
      }
    });
  }

  countByFilter(filter: any, join: IJoin[] = []): any {
    const dbi = this.database ?? "";
    const db = dbs[dbi as keyof typeof dbs];

    const filterQuery = this.filterQuery({ ...filter }, this.table ?? "");

    const joinSql = join.filter(
      (item) =>
        item.joinType === "rightJoin" ||
        item.joinType === "leftJoin" ||
        item.joinType === "join"
    );

    const joinQuery = this.joinSqlQuery(
      joinSql,
      this.relations,
      this.table ?? ""
    );
    const filterJoinQuery = this.joinFilterSqlQuery(
      joinSql,
      this.relations
      // this.table ?? ""
    );
    return db.query(
      `SELECT COUNT(*) AS total FROM ${this.table} ${joinQuery} ${
        [...filterQuery, ...filterJoinQuery].length > 0 ? "WHERE" : ""
      } ${[...filterQuery, ...filterJoinQuery].join(" AND ")}`
    );
  }

  store(payload: any) {
    const dbi = this.database ?? "";
    const db = dbs[dbi as keyof typeof dbs];

    const columns = [...Object.keys(payload), "created_at", "updated_at"].join(
      ","
    );

    const values = [
      ...Object.keys(payload).map((key) => `'${payload[key]}'`),
      `'${new Date().toISOString()}'`,
      `'${new Date().toISOString()}'`,
    ].join(",");

    return db.query(
      `INSERT INTO ${this.table} (${columns}) VALUES (${values})`
    );
  }

  update(payload: any, filter: any) {
    const dbi = this.database ?? "";
    const db = dbs[dbi as keyof typeof dbs];

    const set = [
      ...Object.keys(payload).map((key) => `${key}='${payload[key]}'`),
      `updated_at = '${new Date().toISOString()}'`,
    ].join(",");
    const where = [
      ...Object.keys(filter).map((key) => `${key}='${filter[key]}'`),
    ].join("AND");

    return db.query(`UPDATE ${this.table} SET ${set} WHERE ${where}`);
  }
}
export default Model;
