export const countPercentage = (results: any[]) => {
    const total = results.length;
    const correct = results.filter((result) => result.correct).length;
    return +Math.round((correct / total) * 100).toFixed(2);
}