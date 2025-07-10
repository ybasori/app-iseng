const Create = () => {
    return <><div className="field">
        <label className="label">Title</label>
        <div className="control">
            <input className="input" type="text" placeholder="Text input" />
        </div>
    </div>

        <div className="field">
            <label className="label">Content</label>
            <div className="control">
                <textarea className="textarea" placeholder="Textarea"></textarea>
            </div>
        </div>

        <div className="field is-grouped">
            <div className="control">
                <button className="button is-link">Submit</button>
            </div>
            <div className="control">
                <button className="button is-link is-light">Cancel</button>
            </div>
        </div></>
}

export default Create;