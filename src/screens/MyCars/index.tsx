import { Container } from "./styles";
import React, {useState, useEffect} from 'react'
import CarDto from "../../dtos/CarDto";
import api from "../../services/api";
export function MyCars() {
    const [cars, setCars] = useState<CarDto[]>([])
    const [loading, setIsLoading] = useState(true)


    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1')
                setCars(response.data)
            } catch (error) {
                console.log(error)
            } finally{
                setIsLoading(false)
            }
        }

        fetchCars()
    }, []) 
    return(
        <Container>

        </Container>
    )
}