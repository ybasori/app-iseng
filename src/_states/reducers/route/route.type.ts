
export interface RouteState {
    current: string;
    name: string;
    isProtected?: boolean;
    Template?: React.FC | null;
    component?: React.ReactNode | null;
    params: any
}
