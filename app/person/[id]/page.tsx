import Image from "next/image";
import { Suspense } from "react";

const API_URL = "https://billions-api.nomadcoders.workers.dev/person/";

type FinancialAsset = {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number;
};

type PersonDetail = {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: FinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
};

function makeDynamicApiUrl(id: string) {
  return API_URL + id;
}

async function getBillionDetail(id: string): Promise<PersonDetail> {
  const response = await fetch(makeDynamicApiUrl(id));
  const json = await response.json();
  return json;
}

export default async function PersonDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <Suspense fallback={<h1>Loading detail info</h1>}>
      <DetailView id={id} />
    </Suspense>
  );
}

async function DetailView({ id }: { id: string }) {
  const data = await getBillionDetail(id);

  return (
    <div className="text-white">
      <div className="flex flex-col items-start bg-gray-800 py-20 px-10 rounded-md">
        <Image
          src={data.squareImage}
          alt={data.name}
          width={300}
          height={300}
          className="rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{data.name}</h1>
        <div className="mt-2">
          <p>
            Networth: {Math.round(data.netWorth / 1000).toLocaleString()}{" "}
            Billion
          </p>
          <p>Country: {data.country}</p>
          <p>Industry: {data.industries}</p>
        </div>
        <p className="mt-4">{data.bio}</p>
      </div>

      <div className="mt-10 bg-gray-800 py-20 px-10 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Financial Assets</h2>
        <div className="flex justify-start  flex-wrap gap-4">
          {data.financialAssets.map((asset, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-gray-800 p-4 rounded-lg shadow-lg w-64"
            >
              <p className="font-bold">{`Ticker: ${asset.ticker}`} </p>
              <p>{`Shares: ${asset.numberOfShares.toLocaleString()}`}</p>
              {asset.exerciseOptionPrice == null ? null : (
                <p>{`Exercise Price: $${asset.exerciseOptionPrice.toFixed(
                  2
                )}`}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
