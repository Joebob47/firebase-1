import Link from 'next/link';
import {getSortedList} from '../lib/resources';
import Layout from '../components/layout';

//get static props function must return an object containing either 'props' or others
export async function getStaticProps() {
  const itemData =  await getSortedList();
  //the property of the object dataTot contains the array itemData
  const allData = {dataTot: itemData};
  //it's all in itemData.data. But not we have an object 
  
  console.log("FROM INDEX.JS" + allData);
  return {
    props: {
      allData
    }
  }
}

export default function Home({allData}) {
  //stringData = JSON.parse(stringData);
  console.log("FROM HOME  " + allData.dataTot.data);
  return (
    <Layout home>
        <div className="list-group mx-auto text-center">
          {allData?
            allData.dataTot.map(({id,data}) => (
            <Link key={id} href={`resources/${id}`}>
              <a className="lisat-group-item list-group-item-action">{data.name}</a>
            </Link>
          ))
          : null }
        </div>
    </Layout>
  )}