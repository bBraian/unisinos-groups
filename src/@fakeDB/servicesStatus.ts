const serviceStatus = [
  {id: '1', date: '2024-05-12 15:35', status: 1, responseTime: '322ms'},
];


function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function getServiceStatus() {
  if(serviceStatus.length < 5) {
    for (let i = 2; i <= 60; i++) {
      const statusOptions = [1, 2, 3];
      const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      const randomResponseTime = `${getRandomInt(100, 1000)}ms`;
    
      const startDate = new Date(2024, 0, 1); // Jan 1, 2024
      const endDate = new Date(2024, 11, 31); // Dec 31, 2024
      const randomDateGenerated = randomDate(startDate, endDate);
    
      // Formatting date as 'YYYY-MM-DD HH:MM'
      const formattedDate = randomDateGenerated.toISOString().replace(/:\d+\.\d+Z$/, '').replace('T', ' ');
    
      serviceStatus.push({
        id: `${i}`,
        date: formattedDate,
        status: randomStatus,
        responseTime: randomResponseTime,
      });
  
    }
  }
  
  return serviceStatus;
}

