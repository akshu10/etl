import { BigQuery } from "@google-cloud/bigquery";
import fs from "fs";
/**
 * This function helps to create a DataSet on BigQuery.
 */
async function createDataset(dataSetName) {
  const datasetId = dataSetName || "my_states_dataset3";

  const bigqueryClient = new BigQuery();

  // Specify the geographic location where the dataset should reside
  const options = {
    location: "US",
  };

  // Create a new dataset
  try {
    const [dataset] = await bigqueryClient.createDataset(datasetId, options);
    console.log(`Dataset ${dataset.id} created.`);
  } catch (error) {
    console.log(error.errors[0].message);
  }
}

/**
 * Create a table under a given Dataset
 * @param {*} tableId - A string. Table name.
 */
async function createTable(tableId, datasetId) {
  console.log("CreateTable");
  // Instantiate clients
  const bigqueryClient = new BigQuery();

  const options = {
    location: "US",
  };

  const [table] = await bigqueryClient
    .dataset(datasetId)
    .createTable(tableId, options);

  console.log(`Table: ${table}`);
  console.log(`Table ${table.id} created.`);
}

/**
 * This function loads JSON Data into a table.
 * The schema is manually specified here.
 */

async function loadJSON(datasetId, tableId) {
  // Instantiate clients
  const bigqueryClient = new BigQuery();

  // Inserts the JSON objects into my_dataset:my_table.

  const rows = [
    { name: "Toronto", state: "ON" },
    { name: "Halifax", state: "NS" },
  ];

  // Insert data into a table
  await bigqueryClient.dataset(datasetId).table(tableId).insert(rows);
  console.log(`Inserted ${rows.length} rows`);
}

function createJSONFile(fileName, data) {
  console.log("FileName", fileName);
  console.log("Data", data);

  try {
    for (const value of data) {
      fs.appendFileSync(fileName, JSON.stringify(value));
      fs.appendFileSync(fileName, "\n");
    }
  } catch (error) {
    console.error(error);
  }
}

function main() {
  console.log("MAIN");

  const data = [
    {
      name: "Halifax",
      state: "NS",
    },
    {
      name: "Toronto",
      state: "ON",
    },
    {
      name: "Montreal",
      state: "QC",
    },
    {
      name: "Calgary",
      state: "AB",
    },
  ];

  //   createDataset();
  // const file = createJSONFile("sample-data.jsonl", data);
  //   createTable("Cities", "my_states_dataset3", file);
  loadJSON("my_states_dataset3", "Cities");
}

main();
