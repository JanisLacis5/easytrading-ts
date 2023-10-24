const AddFriendForm = () => {
    return (
        <div className="add-friend">
            <h4>Add friend</h4>
            <form>
                <div>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="email">Email</label>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddFriendForm
