/**
 * 
 * @param fn function to executed in params, arr will passed as params
 * @param arr arr of elements to be passed to fn
 * @param parallelization number of parallely executed functions
 */
export const throttleFunctionExecution = async (fn: any, arr: any, parallelization: number) => {
  
  console.log(`Executing functions in parallel - @${parallelization} `);
  
  let iterator, batch = 0;
  const executions = [];

  const loop = async () => {
    console.log(`Batch - ${++batch}`);
    const q = arr.splice(0, parallelization);
    
    iterator = 0;
    const checkForPendingExecutions = async () => {
      // when there are pending execution but a batch is completed.
      // arr[1,2,3] is done and arr[4,5,6] are pending, iterator is 3
      // restart the loop
      if(arr.length && iterator === parallelization){
        return await loop();
      }
    }
    
    while(q.length){
      iterator++;
      const pr = fn.call(fn, q.shift());
      executions.push(pr);
      // console.log({ iterator, l: q.length });
    }
    // waits for a batch to complete and then check for pending executions
    // recursively does it.
    await Promise.all(executions).then(checkForPendingExecutions);
    
  }

  await loop();
}