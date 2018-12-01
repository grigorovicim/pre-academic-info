
const studentReducer = (state: {professors: {};} = {
    professors: {
    
    }
}, action: any) => {

    const {
      type,
      payload,
    } = action;
  
    //dummy code; all the actions affecting users will need to be treated here
    if (type == '' && payload == '')
      return {

      };
    
      return {
          
      };
  
  
  };
  
  export default studentReducer;