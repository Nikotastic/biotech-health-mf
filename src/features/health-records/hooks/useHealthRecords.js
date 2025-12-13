import { useState, useEffect } from 'react'
import { healthRecordsService } from '../services/healthRecordsService'
import { useHealthStore } from '../../../shared/store/healthStore'

export const useHealthRecords = (animalId = null) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { records, setRecords } = useHealthStore()

  const fetchRecords = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await healthRecordsService.getHealthRecords(animalId)
      setRecords(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [animalId])

  return { records, loading, error, fetchRecords }
}