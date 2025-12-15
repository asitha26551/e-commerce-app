// ProductReviews.jsx
import React from 'react'
import { Star, ThumbsUp } from 'lucide-react'

const mockReviews = [
  {
    id: '1',
    author: 'Sarah J.',
    rating: 5,
    date: '2 months ago',
    content:
      'Absolutely love this product! The quality is outstanding and it arrived much faster than expected. Would definitely recommend to anyone looking for a premium option.',
    helpful: 12,
  },
  {
    id: '2',
    author: 'Michael B.',
    rating: 4,
    date: '1 month ago',
    content:
      'Great value for money. It does exactly what it says on the tin. Only giving 4 stars because the packaging was a bit damaged upon arrival, but the product itself was fine.',
    helpful: 8,
  },
  {
    id: '3',
    author: 'Emily R.',
    rating: 5,
    date: '3 weeks ago',
    content:
      'I was hesitant at first due to the price, but it is worth every penny. The attention to detail is remarkable.',
    helpful: 5,
  },
]

export function ProductReviews({ rating, reviewCount }) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Rating Summary */}
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-lg h-fit">
          <div className="flex items-center mb-4">
            <span className="text-5xl font-bold text-gray-900 mr-4">
              {rating}
            </span>
            <div>
              <div className="flex text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Based on {reviewCount} reviews
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center text-sm">
                <span className="w-12 text-gray-600">{stars} stars</span>
                <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${
                        stars === 5 ? 70 : stars === 4 ? 20 : 5
                      }%`,
                    }}
                  />
                </div>
                <span className="w-8 text-right text-gray-500">
                  {stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-8 space-y-8">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-100 pb-8 last:border-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.author}</h4>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating ? 'fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{review.content}</p>

              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
