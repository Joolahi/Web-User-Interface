import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios';
import './App.css';
import L from 'leaflet';

function App() {
  const position = [62, 26]
  const zoom = 7
  const [courses, setCourses] = useState([])


  useEffect(() => {
    axios
      .get('http://localhost:3001/courses')
      .then(response => {
        console.log(response.data)
        setCourses(response.data)
      })
  }, [])

  const golfIcon = L.icon({
    iconUrl: '/golfIcon.png',
    iconSize: [25, 25]

  })

  const markers = courses.map((course, index) =>
    <Marker position={[course.lat, course.lng]} key={index} icon={golfIcon}>
      <Popup>
        <b>{course.course}</b><br />
        {course.address}<br />
        {course.phone}<br />
        {course.email}<br />
        <a href={course.web} target="_blank" rel="noopener noreferrer">{course.web}</a><br />
        <br />
        <i>{course.text}</i>
      </Popup>

    </Marker>
  );

  return (
    <div>
      <MapContainer center={position} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers}
      </MapContainer>
    </div >
  )
}

export default App