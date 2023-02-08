import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://first-mern-backend.onrender.com/api/workouts')
      const json = await response.json()

      if (response.ok) {
        setLoading(true)
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
        {loading ? '' : <div className="loader__container"><svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg></div>}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
