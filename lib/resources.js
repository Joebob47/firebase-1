import firebase from './firebase';

//return all valid ids for getStaticPaths
//this just sends back the right array of nested obj values that next requires
//so it knows what it can put in in place of the []id in any url path starting with /resources
// returns all valid IDs for getStaticPaths()
export async function getResourceIds() {
    let output = [];
    // wrap try around our code to catch any errors that happen
    try {
      // retrieve ALL documents from firestore collection named "resources"
      const snapshot = await firebase.collection("resources").get();
      
      // loop thru and build out an array of all data from firestore collection documents
      snapshot.forEach(
        (doc) => {
          // console.log(doc.id, '=>', doc.data() )
          output.push(
            {
              params: {
                id:doc.id
              }
            }
          );
        }
      );
    } catch(error) {
      console.error(error);
    }
     console.log(output);
    return output;
  }
//return one document's data for matching id
//this function can send back for one specific identifier, the documents fields
export async function getResourceData(idRequested) {
    // retrieve ONE document matched by unique id
    const doc = await firebase.collection("resources").doc(idRequested).get();
  
    // return all data from firestore document as json
    let output;
    if (!doc.empty) {
      output = { id:doc.id, data:doc.data() };
      // now you can do any data validation you want to conduct
      
    } else {
      output = null;
    }
  
    return output;
  }

export async function getSortedList()
{
    let output = [];
    try{
    const snapshot = await firebase.collection("resources").get();
    snapshot.forEach(
        (doc) => {
          // console.log(doc.id, '=>', doc.data() )
          //this is an array element with an object value in it with two properties :id and data
          output.push(
            {
              //this is forming an object with two parameters id: 'kdjflkdl', data:{desc:'xfds', vid:'kjkld'}
                id:doc.id,
                //this is the entire object value of document fields (this is in data)
                data:doc.data()
            }
          );
        }
      );
} catch(error) {

    console.error(error);
    res.status(error.status || 500).end(error.message);

}

console.log("FROM THE RESOURCES.JS" + output);
return output;
}
