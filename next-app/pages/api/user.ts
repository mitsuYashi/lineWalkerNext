// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOAuth2Client } from "@/oauth";
import { google } from "googleapis";
import { fitness, GaxiosPromise } from "googleapis/build/src/apis/fitness";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  code: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const code = req.query.code as string;
  const oauth2Client = await getOAuth2Client(code);
  const peopleApi = google.people({ version: "v1", auth: oauth2Client });
  const { data: name } = await peopleApi.people.get({
    resourceName: "people/me",
    personFields: "names",
  });
  console.log(name);

  const fitness = google.fitness({
    version: "v1",
    auth: oauth2Client,
  });
  // const fitRes = fitness.users.dataset.aggregate({
  //   userId: "me",
  //   requestBody: {
  //     aggregateBy: [
  //       {
  //         dataTypeName: "com.google.step_count.delta",
  //         dataSourceId:
  //           "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
  //       },
  //     ],
  //     bucketByTime: {
  //       durationMillis: 0,
  //     },
  //     startTimeMillis: 0,
  //     endTimeMillis: 0,
  //   },
  // });
  res.status(200).json({
    code: String(code),
    name: name.names![0].displayName as string,
  });
}
