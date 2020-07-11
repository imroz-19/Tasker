export const filterJobByDate = ({ job }) => {
   const resultantDateMap = {};
   for (const jobItem of job) {
       const { jobname, workorders = {} } = jobItem;
       // iterate over all workorders
       workorders.forEach((workorder) => {
        const date = new Date(workorder.Date);
        const day = date.getDate();
        if (resultantDateMap[day]) {
            resultantDateMap[day].push({
                jobname,
                name: workorder.name
            })
        } else {
            resultantDateMap[day] = [{
                jobname,
                name: workorder.name
            }];
        }
       });
   }  
   return resultantDateMap;
}