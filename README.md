# Chainalysis-Crypto-Exchanges
A simple web application that suggests which crypto exchange to buy and/or sell Bitcoin(BTC) and Ethereum(ETH)   

### Instructions to build and run:  

1. Building Frontend (React App - version: 17.0.2)     
* Head to cryptoexchanges folder   
* Run `npm install` to install all the necessary packages as per the specification   
* Run `npm run build` to build static files to render   

2. Building Backend (Node.js - version: 15.8.0)      
* In the root folder, run `npm install` to install server packages as per the specificaion
* Create a `.env` file in the root folder and specify `PORT={port}`, example: `PORT:3001`   
* If you wish to run the server without interruption then proceed with `forever index.js` command.   
* If you wish to run the server once, then proceed with `node index.js` command   

The frontend is servered by the server at  `http://localhost:3001`.   
The exchanges are taken from `cryptowat.ch` APIs.

### Questionnaire:   
*1. Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?*    

Ans. No, I have considered two exchange source data to make decision on the recommendation. 

*2. Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)*    

Ans. No, I haven't overdesigned any part.    
However, the following factors should be taken into account while designing a website:    
* Identify client's needs
* Business goals to be met
* Usefulness of the website to the visitors
* Features that the website should portray
* The site's capacity or traffic to be handled

*3. If you have to scale your solution to 100 users/second traffic what changes would you make, if any?*    

Ans. To scale my solution to support more traffic, I would consider using the following methods:   
* Load balancing techniques such as Round Robin, Weighted Round Robin, Least Connection, Weighted Least Connection, Source IP Hash, URL Hash
* High-level caching
* Bigger and faster servers with more resources (e.g. CPU and memory)
* Faster disks (e.g. SSDs)
* Scalable databases
* Bandwidth/Network upgrades

*4. What are some other enhancements you would have made, if you had more time to do this implementation*     

Ans. I would have incorporated animations and graphical representations, which are more appealing to the user.    
I would also consider improving the network performance.
