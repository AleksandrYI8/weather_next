import Image from 'next/image';
import localFont from 'next/font/local';
import { useEffect, useState } from 'react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

function getDayAndMonth() {
  const now = new Date();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const month = months[now.getMonth()];

  return { month, dayOfMonth: now.getDate() };
}

export default function Home() {
  const [country, setCountry] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [dataa, setDataa] = useState<any>({});
  const [data_forecast, setData_forecast] = useState<any>({});
  const { month, dayOfMonth } = getDayAndMonth();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (country) {
      fetch(`http://api.weatherstack.com/current?access_key=${baseUrl}&query=${country}`)
        .then(response => response.json())
        .then(data => setDataa(data))
        .catch(error => console.error('Error:', error));
    }


  }, [country, baseUrl]);
  console.log(dataa);




  useEffect(() => {
    if (country) {
      fetch(`http://api.weatherstack.com/forecast?access_key=${baseUrl}&query=${country}&forecast_days=1`)
        .then(response => response.json())
        .then(data => setData_forecast(data))
        .catch(error => console.error('Error:', error));
    }
  }, [country, baseUrl]);
  console.log(data_forecast);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCountry(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const imageSrc = dataa.current && dataa.current.weather_icons && dataa.current.weather_icons.length ? dataa.current.weather_icons[0] : '/sun.svg'




  return (
    <div className="bg-blue-400 w-full h-[100%] ">

      <div className="ms:w-[25%] xl:w-[65%] mx-auto rounded   ms:p-[20px] xl:p-[10px]">
        <form className="flex relative  justify-center w-[100%]  xl:mb-[5%]" onSubmit={handleSubmit}>
          <input
            className="w-[100%] text-[20px] ms:mt-[20px] rounded-[20px] text-black outline-none p-[1%] pl-[4%]"
            type="text"
            placeholder="Search"
            onChange={handleChange}
            value={name}
          />
          <button className="absolute right-[2%] top-[18%]" type="submit">
            <img className="w-[30px]" src="/weather_search.svg" alt="Search" />
          </button>
        </form>

        <Image
          className="mx-auto ms:w-[150px] xl:w-[400px] mb-[5%] bg-none rounded-[50%]"
          src={imageSrc}
          alt="Weather icon"
          width={180}
          height={180}
        />

        <div >
          <div className="flex gap-[10px] justify-center">
            <p>Today,</p>
            <p>{dayOfMonth}</p>
            <p>{month}</p>
          </div>

          <h1 className="text-[100px] text-center">
            {dataa.current ? dataa.current.temperature : '...'}•
          </h1>

          <div className="w-full flex justify-center flex-col items-center gap-[20px]">
            <div className=" flex mx-auto gap-[10px]">
              <div className="flex gap-[10px] border-r pr-[10px]">
                <img className='w-[20px]' src="/wind.svg" alt="sun" />
                <p>Wind</p>
              </div>
              <div className="">
                <p>
                  {dataa.current ? dataa.current.wind_speed : '...'} km/h
                </p>
              </div>
            </div>

            <div className="flex mx-auto gap-[10px]">
              <div className="flex gap-[10px] border-r pr-[10px]">
                <img className='w-[20px]' src="/hum.svg" alt="sun" />
                <p>Hum</p>
              </div>
              <div className="">
                <p>
                  {dataa.current ? dataa.current.humidity : '...'} %</p>
              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
}
