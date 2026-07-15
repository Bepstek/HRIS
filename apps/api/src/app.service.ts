import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getDashboardData() {
    return {
      status: "Operational",
      metrics: {
        totalHeadcount: 1248,
        activeContracts: 1192,
        retentionRate: "94.2%",
        onboardingCompletion: "88%",
      },
      departments: [
        { name: "Engineering", count: 485, budgetUtilization: "82%" },
        { name: "Product Design", count: 182, budgetUtilization: "90%" },
        { name: "People Operations", count: 64, budgetUtilization: "75%" },
        { name: "Product Management", count: 115, budgetUtilization: "88%" },
        { name: "Finance & Legal", count: 42, budgetUtilization: "95%" }
      ],
      systemLogs: [
        { id: "LOG-091", timestamp: "16:05:12", event: "Automated payroll batch executed successfully", type: "system" },
        { id: "LOG-090", timestamp: "15:42:01", event: "New employee profile created: ID-9082", type: "user" },
        { id: "LOG-089", timestamp: "14:15:30", event: "API Gateway synced with localized identity providers", type: "system" }
      ]
    };
  }
}
