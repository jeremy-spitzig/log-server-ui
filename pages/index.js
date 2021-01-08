import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [file, setFile] = useState('')
  const [filter, setFilter] = useState('')
  const [lines, setLines] = useState(0)
  const [results, setResults] = useState(null)
  const loadResults = () => {
    let url = '/api/' + file
    let params = []
    if(filter) {
      params.push('filter=' + filter)
    }
    if(lines) {
      params.push('n=' + lines)
    }
    if(params.length > 0) {
      url += '?' + params.join('&')
    }
    fetch(url)
      .then(async (res) => await res.json())
      .then(result => {
        setResults(result.text)
      })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Log Searcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.header}>Log Searcher</h1>
        <p>Enter the name of the file you would like to search and click Submit.  
           If you would like to limit the results, you can enter filter text and/or 
           set the number of lines you would like to see.</p>
        <form onSubmit={(e)=>{ 
          e.preventDefault();
          return false
        }}>
          <div className={styles.inputGroup}>
            <label>File Name:</label>
            <input type='text' value={file} onChange={e=>setFile(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>Filter Text:</label>
            <input type='text' value={filter} onChange={e=>setFilter(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label>Number of Lines:</label>
            <input type='number' value={lines} onChange={e=>setLines(e.target.value)} />
          </div>
          <div className={styles.submit}>
            <button role='submit' onClick={() => loadResults()}>Submit</button>
          </div>
        </form>
        {results && <pre className={styles.results}>{results}</pre>}
      </main>
    </div>
  )
}
