import { BranchModule } from '../branch/branch.module';
import { BusinessCategoryModule } from '../business-category/business-category.module';
import { BusinessModule } from '../business/business.module';
import { EmployeeModule } from '../employee/employee.module';
import { SectionModule } from '../section/section.module';

export const staticModules = [BusinessCategoryModule, BusinessModule, EmployeeModule, BranchModule, SectionModule];
