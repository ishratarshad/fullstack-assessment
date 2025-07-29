'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../slices/dataSlice'
import type { RootState, AppDispatch } from '../store'

export default function Page() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, status } = useSelector((state: RootState) => state.data)
  const [searchTerm, setSearchTerm] = useState('')
  const [verificationFilter, setVerificationFilter] = useState('all')
  const [subscriptionFilter, setSubscriptionFilter] = useState('all')

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  // Filter and search functionality
  const filteredItems = items.filter(item => {
    const matchesSearch = Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    const matchesVerification = 
      verificationFilter === 'all' || 
      (verificationFilter === 'id-verified' && item['ID Verification'] === 'Verified') ||
      (verificationFilter === 'id-not-verified' && item['ID Verification'] === 'Not verified') ||
      (verificationFilter === 'portfolio-verified' && item['Portfolio Verification'] === 'Verified') ||
      (verificationFilter === 'portfolio-not-verified' && item['Portfolio Verification'] === 'Not verified') ||
      (verificationFilter === 'both-verified' && item['ID Verification'] === 'Verified' && item['Portfolio Verification'] === 'Verified')
    
    const matchesSubscription = 
      subscriptionFilter === 'all' ||
      (subscriptionFilter === 'premium' && item['Subscription'] === 'Premium') ||
      (subscriptionFilter === 'standard' && item['Subscription'] === 'Standard')
    
    return matchesSearch && matchesVerification && matchesSubscription
  })

  // Calculate statistics
  const stats = {
    total: items.length,
    idVerified: items.filter(item => item['ID Verification'] === 'Verified').length,
    portfolioVerified: items.filter(item => item['Portfolio Verification'] === 'Verified').length,
    bothVerified: items.filter(item => item['ID Verification'] === 'Verified' && item['Portfolio Verification'] === 'Verified').length,
    premium: items.filter(item => item['Subscription'] === 'Premium').length,
    standard: items.filter(item => item['Subscription'] === 'Standard').length,
  }

  const formatColumnName = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  }

  const renderCellContent = (key: string, value: any) => {
    const stringValue = String(value)
    
    // Style verification status columns
    if (key.includes('Verification')) {
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          stringValue === 'Verified' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {stringValue}
        </span>
      )
    }
    
    // Style subscription column
    if (key === 'Subscription') {
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          stringValue === 'Premium' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {stringValue}
        </span>
      )
    }
    
    // Format size column
    if (key.includes('Size')) {
      return (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
          {stringValue}
        </span>
      )
    }
    
    // Style usernames
    if (key === 'Username') {
      return (
        <span className="font-medium text-blue-600">
          @{stringValue}
        </span>
      )
    }
    
    // Style member names
    if (key === 'Member Name') {
      return (
        <span className="font-semibold text-gray-900">
          {stringValue}
        </span>
      )
    }
    
    return (
      <span className="text-gray-700">
        {stringValue}
      </span>
    )
  }

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Member Portfolio Analytics
          </h1>
          <p className="text-blue-700 text-lg">Professional member data dashboard - Discover, analyze, and connect with verified portfolios</p>
        </div>

        {/* Statistics Cards */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow border border-blue-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">Total Members</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-blue-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">ID Verified</p>
                  <p className="text-3xl font-bold text-green-600">{stats.idVerified}</p>
                  <p className="text-xs text-blue-500 font-medium">{((stats.idVerified / stats.total) * 100).toFixed(1)}% verified</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-blue-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">Portfolio Verified</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.portfolioVerified}</p>
                  <p className="text-xs text-blue-500 font-medium">{((stats.portfolioVerified / stats.total) * 100).toFixed(1)}% verified</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-blue-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">Premium Members</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.premium}</p>
                  <p className="text-xs text-blue-500 font-medium">{((stats.premium / stats.total) * 100).toFixed(1)}% premium</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow border border-blue-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-blue-700 mb-2">
                Search Members
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name, username, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-blue-300 rounded-md leading-5 bg-white placeholder-blue-500 focus:outline-none focus:placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Verification Filter */}
            <div className="lg:w-56">
              <label htmlFor="verification-filter" className="block text-sm font-medium text-blue-700 mb-2">
                Verification Status
              </label>
              <select
                id="verification-filter"
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e.target.value)}
                className="block w-full px-3 py-2 border border-blue-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Verification</option>
                <option value="id-verified">ID Verified</option>
                <option value="id-not-verified">ID Not Verified</option>
                <option value="portfolio-verified">Portfolio Verified</option>
                <option value="portfolio-not-verified">Portfolio Not Verified</option>
                <option value="both-verified">Both Verified</option>
              </select>
            </div>

            {/* Subscription Filter */}
            <div className="lg:w-48">
              <label htmlFor="subscription-filter" className="block text-sm font-medium text-blue-700 mb-2">
                Subscription Type
              </label>
              <select
                id="subscription-filter"
                value={subscriptionFilter}
                onChange={(e) => setSubscriptionFilter(e.target.value)}
                className="block w-full px-3 py-2 border border-blue-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Subscriptions</option>
                <option value="premium">Premium</option>
                <option value="standard">Standard</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-blue-600">
            <span className="font-medium">
              Showing <span className="text-blue-800 font-bold">{filteredItems.length}</span> of <span className="text-blue-900 font-bold">{items.length}</span> members
            </span>
            {(searchTerm || verificationFilter !== 'all' || subscriptionFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setVerificationFilter('all')
                  setSubscriptionFilter('all')
                }}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {status === 'loading' ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-blue-700 font-medium">Loading member data...</span>
            </div>
          </div>
        ) : status === 'failed' ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 font-medium">Failed to load member data</div>
            <div className="text-red-500 text-sm mt-1">Please check your connection and try again</div>
          </div>
        ) : (
          /* Table Container */
          <div className="bg-white rounded-lg shadow border border-blue-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-50">
                  <tr>
                    {items.length > 0 &&
                      Object.keys(items[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-4 text-left text-xs font-medium text-blue-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          {formatColumnName(key)}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50 transition-colors duration-150">
                        {Object.entries(row).map(([key, val], j) => (
                          <td
                            key={j}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {renderCellContent(key, val)}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={Object.keys(items[0] || {}).length} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.529.881-6.172 2.328l-.707.707L12 21l6.879-2.965-.707-.707A7.962 7.962 0 0112 15z" />
                          </svg>
                          <p className="text-lg font-medium">No members found</p>
                          <p className="text-sm">Try adjusting your search or filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer */}
            <div className="bg-blue-50 px-6 py-3 border-t border-blue-200">
              <div className="text-sm text-blue-700">
                Showing <span className="font-medium">{filteredItems.length}</span> of <span className="font-medium">{items.length}</span> members
                {searchTerm && (
                  <span className="ml-2">
                    • Search: "<span className="font-medium">{searchTerm}</span>"
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
