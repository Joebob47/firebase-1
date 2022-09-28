import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getSortedList} from '../lib/resources';

export async function getStaticProps() {
  const itemData =  await getSortedList;
  const stringData = JSON.stringify(itemData);
  console.log(stringData);
  return {
    props: {
      stringData
    }
  }
}

export default function Home({stringData}) {
  return (
    <div>
        <h1> Some of My Favorite Bands </h1>
        <div className="list-group mx-auto text-center">
          {allData ?
            itemData.map(({ id, name }) => (
            <Link key={stringData.data.id} href={`/${id}`}>
              <a className="lisat-group-item list-group-item-action">{stringData.data.name}</a>
            </Link>
          ))
          : null }
        </div>
    </div>
  )}