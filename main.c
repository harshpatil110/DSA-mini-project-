#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_INCOMES 100
#define MAX_LENGTH 100

// Data structure for incomes
typedef struct Income {
    float amount;
    char date[MAX_LENGTH];
    char type[MAX_LENGTH];
    char description[MAX_LENGTH];
} Income;

// Data structure for expenses
typedef struct Expense {
    float amount;
    char date[MAX_LENGTH];
    char type[MAX_LENGTH];
    char description[MAX_LENGTH];
    char category[MAX_LENGTH];
    struct Expense* next;
} Expense;

// Global variables
Income incomes[MAX_INCOMES];
int incomeCount = 0;
Expense* expenseList = NULL; // Linked list for expenses
float balance = 0;

// Function to add income
void addIncome(float amount, const char* date, const char* type, const char* description) {
    if (incomeCount < MAX_INCOMES) {
        incomes[incomeCount].amount = amount;
        strcpy(incomes[incomeCount].date, date);
        strcpy(incomes[incomeCount].type, type);
        strcpy(incomes[incomeCount].description, description);
        balance += amount;
        incomeCount++;
        printf("Income added: ₹%.2f\n", amount);
    } else {
        printf("Income list is full.\n");
    }
}

// Function to create a new expense node
Expense* createExpense(float amount, const char* date, const char* type, const char* description, const char* category) {
    Expense* newExpense = (Expense*)malloc(sizeof(Expense));
    if (newExpense) {
        newExpense->amount = amount;
        strcpy(newExpense->date, date);
        strcpy(newExpense->type, type);
        strcpy(newExpense->description, description);
        strcpy(newExpense->category, category);
        newExpense->next = NULL;
    }
    return newExpense;
}

// Function to add an expense
void addExpense(float amount, const char* date, const char* type, const char* description, const char* category) {
    Expense* newExpense = createExpense(amount, date, type, description, category);
    if (newExpense) {
        newExpense->next = expenseList;
        expenseList = newExpense;
        balance -= amount;
        printf("Expense added: ₹%.2f on %s [%s - %s]\n", amount, date, category, type);
    } else {
        printf("Error adding expense.\n");
    }
}

// Function to delete an expense by index
void deleteExpense(int index) {
    if (index < 0) {
        printf("Invalid index.\n");
        return;
    }

    Expense* current = expenseList;
    Expense* previous = NULL;

    for (int i = 0; i < index && current != NULL; i++) {
        previous = current;
        current = current->next;
    }

    if (current != NULL) {
        if (previous == NULL) { // Deleting the first node
            expenseList = current->next;
        } else {
            previous->next = current->next;
        }

        balance += current->amount;
        printf("Expense deleted: ₹%.2f\n", current->amount);
        free(current);
    } else {
        printf("Expense not found.\n");
    }
}

// Function to display balance
void displayBalance() {
    printf("Current balance: ₹%.2f\n", balance);
}

// Function to display incomes
void displayIncomes() {
    printf("Incomes:\n");
    for (int i = 0; i < incomeCount; i++) {
        printf("Income %d: ₹%.2f on %s [%s - %s]\nDescription: %s\n", 
            i + 1, 
            incomes[i].amount, 
            incomes[i].date, 
            incomes[i].type, 
            incomes[i].description);
    }
}

// Function to display expenses
void displayExpenses() {
    printf("Expenses:\n");
    Expense* current = expenseList;
    int index = 1;
    while (current != NULL) {
        printf("Expense %d: ₹%.2f on %s [%s - %s]\nDescription: %s\n", 
            index++, 
            current->amount, 
            current->date, 
            current->category, 
            current->type, 
            current->description);
        current = current->next;
    }
}

// Main function
int main() {
    char inputUsername[MAX_LENGTH], inputPassword[MAX_LENGTH];
    char storedUsername[MAX_LENGTH], storedPassword[MAX_LENGTH];

    // Prompt user to set their username and password
    printf("Set your username: ");
    scanf("%s", storedUsername);
    printf("Set your password: ");
    scanf("%s", storedPassword);

    // User login process
    printf("\n--- Login ---\n");
    printf("Enter username: ");
    scanf("%s", inputUsername);
    printf("Enter password: ");
    scanf("%s", inputPassword);

    // Validate login credentials
    if (strcmp(inputUsername, storedUsername) != 0 || strcmp(inputPassword, storedPassword) != 0) {
        printf("Invalid username or password. Exiting...\n");
        return 1; // Exit the program
    }

    int choice;
    float amount;
    char date[MAX_LENGTH], category[MAX_LENGTH], type[MAX_LENGTH], description[MAX_LENGTH];
    int deleteIndex;

    do {
        printf("\n--- Expense Tracker Menu ---\n");
        printf("1. Add Income\n");
        printf("2. Add Expense\n");
        printf("3. Delete Expense\n");
        printf("4. Display Balance\n");
        printf("5. Display Incomes\n");
        printf("6. Display Expenses\n");
        printf("7. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter income amount: ₹");
                scanf("%f", &amount);
                printf("Enter income date (YYYY-MM-DD): ");
                scanf("%s", date);
                printf("Enter income type: ");
                scanf("%s", type);
                printf("Enter income description: ");
                scanf(" %[^\n]", description);  // This reads the whole line for description
                addIncome(amount, date, type, description);
                break;
            case 2:
                printf("Enter expense amount: ₹");
                scanf("%f", &amount);
                printf("Enter expense date (YYYY-MM-DD): ");
                scanf("%s", date);
                printf("Enter expense type: ");
                scanf("%s", type);
                printf("Enter expense description: ");
                scanf(" %[^\n]", description);  // This reads the whole line for description
                addExpense(amount, date, type, description, category);
                break;
            case 3:
                printf("Enter the index of the expense to delete: ");
                scanf("%d", &deleteIndex);
                deleteExpense(deleteIndex - 1); // Index is 1-based
                break;
            case 4:
                displayBalance();
                break;
            case 5:
                displayIncomes();
                break;
            case 6:
                displayExpenses();
                break;
            case 7:
                printf("Exiting...\n");
                break;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    } while (choice != 7);

    return 0;
}
