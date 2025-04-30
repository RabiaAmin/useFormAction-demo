import { useActionState } from "react";

export function NewOpinion() {
function shareOpinionAction(prevData , formData){
       const title = formData.get('title');
       const body = formData.get('body');
       const userName = formData.get('userName');

       const errors = [];

       if(title.trim().length <5 ){
            errors.push("title must be atleast five words long.");
       }

       if(body.trim().length < 10 || body.trim().length > 300){
        errors.push("opinion must be in between 10 and 300");
       }

       if(!userName.trim()){
        errors.push('please enter username')
       }

       if(errors.length > 0){
        return {
          errors, enteredValue : {
            title,body,userName
          }
        }
       }


      //  submission to backend 

      return {
        errors : null
      }

}


   const [formState , formAction] = useActionState(shareOpinionAction,{errors:null});

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValue?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValue?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" defaultValue={formState.enteredValue?.body}  rows={5}></textarea>
        </p>

        {formState.errors && <ul className="errors">
          {
            formState.errors.map((error)=><li key={error}>{error}</li>)
          }
          </ul>}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
