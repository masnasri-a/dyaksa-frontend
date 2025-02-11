import { Card, CardContent } from '@/components/ui/card'
import { Carousel } from '@trendyol-js/react-carousel'
import { Quote } from 'lucide-react'
import React from 'react'

const Review = () => {
  const [reviews, setReviews] = React.useState<string[]>([]);
  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + "/reviews?pagination%5BpageSize%5D=5&populate=%2A");
        const data = await response.json();
        const content = data.data;
        const reviews: string[] = [];
        for (let i = 0; i < content.length; i++) {
          reviews.push(content[i].Content+" - "+content[i].Name);
        }
        setReviews(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);
  return (
    <div>
      {
          reviews &&
      <Carousel show={1} slide={reviews.length} swiping={true} infinite={true} dynamic={true} autoSwipe={2000} className='p-10'>
        {reviews.map((review, index) => (
          <Card key={index} className='w-full bg-[#e0e2e2] p-4 text-center'>
            <CardContent className='flex flex-col items-center justify-center space-y-6'>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-[1px] bg-[#ba8965] w-24"></div>
                <span className='text-[#ba8965]'>TESTIMONIALS</span>
                <div className="h-[1px] bg-[#ba8965] w-24"></div>
              </div>
              <span className='font-semibold text-3xl'>What our clients have to say...</span>
              <div className="w-full justify-center flex-col items-center flex text-center">
                <Quote className='text-[#593114]' />
                <div className="w-10/12 md:w-8/12 lg:w-6/12 mt-4">
                  <span className='font-yellowtail text-xl text-[#ba8965]'>
                    {review}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </Carousel>
        }

    </div>
  )
}

export default Review