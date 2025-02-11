import React from 'react'

const Description = () => {
    const [media, setMedia] = React.useState<string>("");

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + '/contents?populate=%2A&filters%5Bkey%5D=Description');
                const data = await response.json();
                setMedia(data.data[0].value);
            } catch (error) {
                console.error('Error fetching media:', error);
            }
        };

        fetchData();
    }, []);
  return (
    <div className='w-full text-center flex justify-center font-thin'>
        <span className='text-sm md:text-base w-7/12 mx-auto'>
            {media.split('</br>').map((line, index) => (
                <React.Fragment key={index}>
                    {index === 0 ? <b>{line}</b> : line}
                    <br />
                </React.Fragment>
            ))}
        </span>

    </div>
  )
}

export default Description