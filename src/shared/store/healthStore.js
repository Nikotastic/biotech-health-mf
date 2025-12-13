import { create } from 'zustand'

export const useHealthStore = create((set) => ({
  records: [],
  vaccinations: [],
  treatments: [],
  loading: false,
  
  setRecords: (records) => set({ records }),
  setVaccinations: (vaccinations) => set({ vaccinations }),
  setTreatments: (treatments) => set({ treatments }),
  setLoading: (loading) => set({ loading })
}))