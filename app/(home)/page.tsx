import Image from "next/image";
import Link from "next/link";

const API_URL = "https://billions-api.nomadcoders.workers.dev/";

type Person = {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
};

async function getBillions(): Promise<Person[]> {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function Home() {
  const data = await getBillions();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-y-10 gap-x-10">
      {data.map((person) => (
        <Link key={person.id} href={`/person/${person.id}`}>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md w-[250px]">
            <Image
              width={250}
              height={250}
              src={person?.squareImage}
              alt={person.name}
              className="w-full h-250 object-contain"
            />
            <div className="p-4">
              <h2 className="text-white text-lg font-semibold">
                {person.name}
              </h2>
              <p className="text-gray-400">
                {Math.round(person.netWorth / 1000).toLocaleString()} Billion /{" "}
                {person.industries[0]}
              </p>
            </div>
          </div>{" "}
        </Link>
      ))}
    </div>
  );
}
