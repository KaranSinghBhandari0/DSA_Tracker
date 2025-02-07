import React from 'react'
import SearchBar from '../components/SearchBar'
import TopicsSlider from '../components/TopicsSlider.jsx'
import Questions from '../components/Questions.jsx'

export default function Home() {
    return (
        <div className='pt-12 px-2'>
            <SearchBar />
            <TopicsSlider/>
            <Questions/>
        </div>
    )
}
