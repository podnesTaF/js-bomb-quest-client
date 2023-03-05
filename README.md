js quest:

Idea:
1) Create app with modules and questions, Hints, errors, answers, progress etc.
2) Questions on four topics:
- js event loop
- react hooks basics
- typescript
- promises
3) each module has 10 - 12 different questions with several type of introduction the problem
- Multiple answers one correct
- Multiple answers several correct
- drag and drop (event loop, etc)
- reorder elements in correct order
- own answer
4) Hints after wrong question, explaining right one; and little hint clicking on the "?" icon in the right top corner
5) congratulation component after finish test with analyze of answers and correct one, if guy didn't answer more than 50% of quest, make him redo, if it isn't the case, go on the main page with modules, unlock next module. 
6) ### User Auth:
- Authorized user can be an author of a module;
- User can see history and statistic of results on his profile page;

side notes:

- It's shouldn't be a problem to add another module just adding it to database;

- first make it without user, than add it with profile and weak points.

- recommendations page with good react, js, ts content

- review module

Entities (mvp):
1) Modules,
2) Questions,
3) Answers

Entities (expanded):
1) Modules,
2) Questions,
3) Answers,
5) Users / Authors
6) Results

Tools:
1) React
2) TypesScript
3) ionic framework
4) redux toolkit and rtk query
5) scss

backend:
1) Strapi
