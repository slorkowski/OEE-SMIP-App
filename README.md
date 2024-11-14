# OEE-SMIP-App

A GraphQL-based web App for the CESMII SM Innovation Platform.

This app uses a ThinkIQ Library, including standard Type definitions (available in the CESMII Cloud Library) that computes OEE, and its component functions, for any equipment (given a few key datapoints). Import the Library (in the smip folder) to get started in the SMIP. Then, bind tags to the datpoints shown below.  
Required
  1. Daily Actual Cycles (Performance)
  2. Daily Good, Bad, Total Product (Quality) Need 2 of the 3 to calculate the other.
  3. Running & Faulted (Availability)

Optional 
   1. Last Fault Code
   2. In Auto
   3. Starved & Blocked

The app is written in pure Javascript (Vue) using the GraphQL API provided by the SMIP. For more details, see the [frontend/README.md](frontend/README.md).
