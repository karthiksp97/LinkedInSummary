import React, { useState } from 'react'
import axios from 'axios'
import {
    Box,
    Input,
    Button,
    VStack,
    Container,
    Text,
} from '@chakra-ui/react'
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/home")({
    component: SearchPage
})

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState('')

    // Validate LinkedIn URL
    const validateLinkedInURL = (url: string) => {
        // Regular expression to match LinkedIn profile URLs
        const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|profile|pub)\/.+$/i

        return linkedInRegex.test(url)
    }

    const handleSearch = () => {
        // Reset previous error
        setError('')

        // Trim the input to remove any whitespace
        const trimmedURL = searchTerm.trim()

        // Check if the URL is a valid LinkedIn profile URL
        if (!validateLinkedInURL(trimmedURL)) {
            setError('Please enter a valid LinkedIn profile URL')
            return
        }

        // If validation passes, log the URL
        const url = import.meta.env.VITE_API_URL;

        // console.log(url)
        // console.log('Searching LinkedIn profile:', trimmedURL)

        // Reset error if validation passes
        setError('')


        const search = async()=>{

            try {
                const response = await axios.get(`${url}/`)
    
                console.log('API response:', response.data)
    
                // Handle response data (e.g., show profile info on the UI)
              } catch (err: any) {
                console.error('Axios error:', err)
                setError(
                  err.response?.data?.message || 'Failed to fetch profile data'
                )
              }

        }

        search()
    }

    return (
        <Container centerContent maxW="container.md" py={10}>
            <VStack gap={4} width="full">
                <Input
                    placeholder="Enter LinkedIn Profile URL"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setError('') // Clear error when typing
                    }}
                    size="lg"
                    borderColor={error ? 'red.500' : undefined}
                />
                {error && (
                    <Text color="red.500" fontSize="sm" width="full">
                        {error}
                    </Text>
                )}
                <Button
                    colorScheme="blue"
                    onClick={handleSearch}
                    width="full"
                >
                    Search LinkedIn Profile
                </Button>
            </VStack>
        </Container>
    )
}

export default SearchPage