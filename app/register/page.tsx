"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(password !== confirmPassword){
      setError("Password does not match")
    }
    try {
      await fetch("api/auth/register")
    } catch (error) {
      
    }
  }
  return (
    <div>
      
    </div>
  )
}

export default Register