import {getResourceIds, getResourceData} from '../../lib/resources';
import Image from 'next/image'

//every next js app that uses dynamic urls MUST INCLUDE GETSTATICPATHS in dynamic page 
//this function calls getResourceData
export async function getStaticProps({ params }) {
    const itemData = await getResourceData(params.id);
    // console.log(itemData);
    return {
      props: {
        itemData
      }
    };
  }


export async function getStaticPaths() {
    const paths = await getResourceIds();
    // console.log(paths);
    return {
      paths,
      fallback: false
    };
  }
  

export default function Entry({ itemData }) {
    console.log(itemData);
    return (
      <article className="card col-6 mx-auto text-center">
        <div className="card-body">
          <h5 className="card-title">{itemData.data.name}</h5>
          <img src={itemData.data.picture} class="img-fluid"></img>
          <p className="card-text">{itemData.data.description}</p>
          {itemData.data.url ?
            <a className="btn btn-primary" href={itemData.data.url}>Link out</a>
            : null
          }
        </div>
      </article>
    );
  }