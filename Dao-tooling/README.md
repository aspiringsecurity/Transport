# DAO tools for OEM Product development, Safety Feature Development and Improving efficiency at OEM companies like Toyota, GM Motors, Ford Motors

###### Set up

```
cd OEM-Frontend 
npm install
npm run dev

```
**Context:**

This Github contains the contribution towards OEM product development and efficiency:

The goal of the hackathon was to address two challenges in OEM:
1. Focus on safety feature development in OEM vehicles
1. Increasing workload on managers due to an increase in business decision-making and team member management.
2. Help improve the impact that team members have on company growth.

The solution context was set by OEM as follows:
1. Create an intra-company DAO support tools which OEM employees may actually use in the future.
2. Create a product that could actually scale to external parties
3. Create a product that members can operate autonomously and decision-making is distributed  


**Proposal Focus:**

In our proposal, we focus on the following problems
1. How do we help OEM employees surface problems and solutions that are important to them? How do we do this without managers having to be the middleman of this process?
2. How do we allow other members to constructively contribute to ideas that have been put forward? How do we do this avoiding the complexity and chaos that plague usual proposal discussions in DAOs?


**RnDAO Solution - OEM IDEA HQ:**

To solve the above mentioned problems, we created the OEM IDEA HQ. IDEA HQ is a web product built on the MERN stack that uses Astar wallet IDs as user identifiers (non-custodial for POC, next version will be custodial with account abstraction). The goal of IDEA HQ is to surface the most critical problems that OEM employees see within the organisation, and allow them to collectively come up with solutions to these problems. Core to the OEM model is the insight that employees on the shop floor - those closest to the real work - can see problems better and faster (Jidoka). Separating problems from solutions means all of it is done in a decentralised way, without the need for managers to interfere. 

More concretely OEM IDEA HQ allows the following:

1. Any OEM employee can submit a problem they see in the organisation
2. Employees can upvote problems that they resonate with
3. Any Employee can submit their own solution to any problem
4. Employees can comment and discuss solutions, and help the initial proposer to improve the solution
5. Employees can also upvote solutions to surface the highest priorities

The most upvoted solutions can then be brought to the relevant OEM committees that can fund and staff relevant teams to execute the ideas, pulling from the pool of people who have upvoted the problem. This part is out of scope of this proposal

Because OEM employees log in with their Astar wallets, contributions to OEM IDEA HQ are mapped to their wallet address, and at a later point can be minted as contribution badges that employees can use to show their skills and level of participation. This part is out of scope of this proposal, but will be implemented as a next step.

Note: Currently OEM IDEA HQ does not separate employee access based on their department and job type. In the future smart filters/Sub DAO setups will be used to create a more targeted experience.

<br/><br/>

**Benefit of OEM IDEA HQ:**

OEM IDEA HQ has the following benefits
1. The most important problems/challenges are made visible to everyone in the organisation
2. The wisdom of the crowd will determine which problems are most pressing and surface priorities
3. Every employee is empowered to come up with solutions to these problems. Ideas can come from everywhere now.
4. Employees can collaborate on improving ideas and prioritise the most important
5. Managers do not have to intervene in the process saving important time

<br/><br/>

**How does OEM IDEA HQ work?:**

The following section will guide you through all the relevant screens of OEM IDEA HQ from the perspective of a OEM employee called Kenzo.
<br/><br/>
**Login:**
Ken logs in with his Astar compatible wallet. His address was whitelisted from the OEM main office and has access to IDEA HQ.

**Home:**
Ken explores the highest trending problems and solutions that his team members across OEM are surfacing. He can decide to upvote problems/solutions if they resonate with him. He can also add a problem/solution if he has an idea that is not represented in the list.

![Desktop - 1 (1)](https://user-images.githubusercontent.com/125877341/225916631-a0d1dc61-fde1-4cda-9c03-53ce1d517268.png)

<br/><br/>
**Problem overview:**
Today Ken decides to add a problem that he encountered to the list - His team is still using outdated modelling software and it causes delays. He goes to the problem overview where he adds the problem and upvotes some that resonate with him.

![Desktop - 2](https://user-images.githubusercontent.com/125877341/225916556-7c7794be-4600-4f97-8859-b2ab4111d14d.png)

<br/><br/>
**Solution overview:**
Afterwards Ken goes to the solution overview page where his colleagues have started to come up with ideas on how to address some of the prevailing problems. One particularly resonates with him and he decides to read more details.

![Desktop - 3](https://user-images.githubusercontent.com/125877341/225916492-fc0dfd6f-d46f-4db2-ae02-31cc1ce96a9f.png)


<br/><br/>
**Solution details:**
Ken reads through the proposal details and decides to add some comments that he thinks will help his colleagues improve the solution.

![Desktop - 12](https://user-images.githubusercontent.com/125877341/225916313-fb7177ae-eb83-4f3a-a110-e663e5bfb059.png)
![Desktop - 10](https://user-images.githubusercontent.com/125877341/225916375-abd0679d-2aca-4477-9a68-0abec25aeaae.png)

<br/><br/>
**Propose solution screen:**
Ken also decides to add his own solution proposal. He links the problems the solution solves, and fills in the required fields. In a few clicks he submits the proposal.

![Desktop - 4](https://user-images.githubusercontent.com/125877341/225916418-9c93c84d-176a-44b7-b70f-90c4c4a717d2.png)


