import { BranchModule } from '../branch/branch.module';
import { BusinessCategoryModule } from '../business-category/business-category.module';
import { BusinessModule } from '../business/business.module';
import { EmployeeModule } from '../employee/employee.module';

export const staticModules = [BusinessCategoryModule, BusinessModule, EmployeeModule, BranchModule];
