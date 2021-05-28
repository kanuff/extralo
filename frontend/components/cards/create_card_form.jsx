
export const CreateCardForm = (props) => {
  
  return (
  <form className={"create-card-form"} onSubmit={this.handleCardSubmit}>
    <input
      type="text"
      placeholder={"Enter a link for this thought..."}
      onChange={this.update("cardTitle")}
    />
    <div ref={el => this.listIndexBottom = el}>
      <input
        type="submit"
        value={"Add Card"}
      />
      <button onClick={this.formToggle}> x </button>
    </div>
  </form>
  )
}