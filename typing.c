#include <stdio.h>
#include <string.h>
#include <time.h>
#include <ctype.h>
#include <stdlib.h>

int c_words(char *typed)
{
    int count = 0; 
    int word_c = 0;
    for(int i = 0; typed[i] != '\0'; i++)
    {
        if(isspace(typed[i]))
        {
            word_c = 0;
        }
        else if(!word_c)
        {
            word_c = 1;
            count++;
        }
    }
    return count;
}

int main(int argc, char *argv[])
{
    if(argc != 4)
    {
        printf("{\"error\": \"Usage: typing.exe <typed> <original> <time>\"}\n");
        return 1;
    }
    
    char *typed = argv[1];
    char *original = argv[2]; 
    double time_ta = atof(argv[3]);  
    int correct = 0, error = 0;
    int lentar = strlen(original);
    int lenty = strlen(typed);
    int min_len = (lentar < lenty) ? lentar : lenty;
    for(int i = 0; i < min_len; i++)
    {
       
    if(i < lentar && isspace(original[i]) && isspace(typed[i]))
    {
        continue; 
    }
    
    if(i < lentar && original[i] == typed[i])
    {
        correct++;
    }
    else if(!isspace(typed[i]))
    {
        error++;
    }
    }

    
    double accuracy = (lentar == 0) ? 0 : ((double)correct / lentar) * 100;
    double minutes = time_ta / 60.0;
    double wpm = (minutes > 0) ? (c_words(typed)/ minutes) : 0;
    printf("{\"accuracy\": %.2f, \"wpm\": %.2f, \"errors\": %d}\n", 
           accuracy, wpm, error);
    
    return 0;
}