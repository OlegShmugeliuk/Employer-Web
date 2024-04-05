import { Typography, Link, Button } from '@mui/material'
import {FAQCard} from "../cards/faqcard";

export default function Help() {
  return (
    <>
      {/* <Typography variant="h3" component="h6" style={{ paddingBottom: 20 }}>
        Employer FAQ
      </Typography> */}

      <Link
        component="a"
        href="mailto:support@benefi.com?subject=Contact Us"
        target="_blank"
        underline="hover"
        rel="noreferrer"
      >
        Can&apos;t find an answer in the FAQ? Click here to contact us.
      </Link>

      <Typography
        variant="h4"
        component="h6"
        style={{ paddingTop: 30, paddingBottom: 30 }}
      >
        About the Employee experience
      </Typography>
        <FAQCard
            question={'How can I let my employees know about Benefi and the Goal Bonus?'}
            answer={`Benefi can provide a full communication package that your company can share at every stage; the offer, onboarding, maintenance (shared drive), and departure.`}
        />
        <FAQCard
            question={'Why do potential or existing employees want a Goal Bonus?'}
            answer={`Benefi is enticing for many employees for several reasons. For many employees, cash is king; being able to access a full bonus up front helps them achieve a meaningful life goal; financial stability, escape from debt, getting married, a down payment on a house, or other outcome. It's clear to the employee that it's your firm that has enabled this outcome.`}
        />
        <FAQCard
            question={'How is Benefi different from a traditional retention bonus?'}
            answer={`Most other signing and retention bonuses are difficult to manage, leading to errors, noncompliance, and defaults. Employees don't always get the full bonus amount up front, and since employers are not in the business of collecting money if an employee leaves the organization, the post-employment experience is less than ideal for both employer and employee.`}
        />
        <FAQCard
            question={'How does Benefi show up on our financial statements?'}
            answer={`If your company funds the bonus, your financial statements will see a decrease to cash, and a subsequent increase in accounts recieveable. During a vesting milestone, this will register as a payroll expense, and a decrease in receivables. This is the point when you should make a payroll tax contribution. If Benefi funds the bonus (with your guarantee), you'll see an increase in liabilities to Benefi. This does not include the fees for the use of the Benefi platform, which should be treated as an expense.`}
        />
        <FAQCard
            question={'What about employee taxes? What happens there?'}
            answer={`The forgivable loan is treated as a 'taxable benefit' Benefi provides the correct amount to be deducted on an annualized basis. During the periods when the loan is 'forgiven', the forgiven amount is then treated as taxable income, just like any other bonus.`}
        />
        <FAQCard
            question={'What happens if an employee leaves the company before a bonus is fully vested?'}
            answer={`If an employee leaves your organization for any reason, you should let us know! In some cases, firms may also consider forgiving outstanding bonuses (such as in scenarios where the employee has left under contentious circumstances). Upon departure, Benefi will contact the employee using their personal email (provided to Benefi upon signup). We'll verify the last day worked, the grace period, the payable amount, the repayment schedule, and the interest rate attached.`}
        />
        <FAQCard
            question={'How does Benefi collect funds from employees who have left the company?'}
            answer={`Benefi collects information from the employee upon signup that helps us process a 'pre-authorized deposit' from the employee's bank account. In the scenario that this is not possible, the employee is responsible for remitting payments to Benefi directly from their bank account. Benefi handles collections with empathy and consideration for the ex-employee.`}
        />

      <Typography
        variant="h4"
        component="h6"
        style={{ paddingTop: 30, paddingBottom: 20 }}
      >
        Admin and Management
      </Typography>
        <FAQCard
            question={'Who funds the bonus?'}
            answer={`In most cases, the employer funds the bonus (just like any other bonus). Benefi can also fund the bonus with your company's guarantee. There is a cost for this service.`}
        />
        <FAQCard
            question={'What do we need to do to issue bonuses?'}
            answer={`After your account has been created, upload the employee details of the individual(s) to whom you'd like to send a bonus. It's easy to set your parameters and issue your first bonuses.`}
        />
        <FAQCard
            question={'How do we track the vesting milestones?'}
            answer={`Benefi will help with this; we track the start date, vesting amount, and your vesting schedule to provide a clear picture for you and your teams.`}
        />
        <FAQCard
            question={'How do we get our money back from an ex-employee?'}
            answer={`Benefi handles the collection process and remits the outstanding amounts as per the collection schedule. In circumstances where the loan shifts to a default status, Benefi may engage the services of a collection agency to recapture the outstanding amounts.`}
        />
        <FAQCard
            question={'How do we get our money back from an ex-employee?'}
            answer={`Benefi handles the collection process and remits the outstanding amounts as per the collection schedule. In circumstances where the loan shifts to a default status, Benefi may engage the services of a collection agency to recapture the outstanding amounts.`}
        />
        <FAQCard
            question={'Are there special circumstances where we would want to fully forgive the loan prior to vesting?'}
            answer={`In some cases, a company may forgive a loan for compassion reasons (such as a layoff or serious injury/illness obtained at work), or in scenarios where the employee has left the company under special circumstances.`}
        />
        <FAQCard
            question={'What integration is needed to run Benefi?'}
            answer={`Benefi is integration-light, meaning it is super-easy to get started.
        After your company account has been created, it's easy to upload
        your employees and issue your first bonus.`}
        />
    </>
  )
}
