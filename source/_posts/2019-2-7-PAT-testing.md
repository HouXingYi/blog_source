---
layout: post
title: "PAT乙级官方例题练习"
subtitle: "PAT Practice"
date: 2019-2-7
author: HouXingYi
category: PAT
tags: PAT
finished: true
---

## 前置条件

甲级考试的分数分布一般为：20、25、25、30；乙考试的分数分布一般为：15、20、20、20、25。

PAT练习题列表地址（乙级）：https://pintia.cn/problem-sets/994805260223102976/problems

开发工具：Dev-C++ 5.11（尽量与考场接近）

参考用书：《算法笔记》 机械工业出版社

## 1001 害死人不偿命的(3n+1)猜想 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805325918486528

答案：

```
#include<cstdio>

main () {
	
	int n, step = 0;
	
	scanf("%d", &n);
	
	while (n != 1) {
		if (n % 2 == 0) {
			n = n / 2;
		} else {
			n = ( 3 * n + 1) / 2;
		}
		step++;
	}
	
	printf("%d", step);
	
	return 0;
	
}
```

## 1002 写出这个数 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805324509200384

注意点：保证n小于10^100，超出 int ，long 的范围，故首先考虑字符串。因n不超过10的100次方, 所以sum小于9乘以100, 即sum一定不会大于三位数。strlen的使用。

答案：

```
#include<cstdio>
#include<cstring>

using namespace std;

main () {
	
	int sum = 0;
	char c[110];
	
	scanf("%s", c);
	
	for(int i = 0; i < strlen(c); i++) { 
		sum += c[i] - '0'; // 字符转化 
	}
	
	char pinyins[10][5] = { "ling", "yi", "er", "san", "si", "wu", "liu", "qi", "ba", "jiu"};
	 
	if ( sum < 10 ) {
		printf("%s", pinyins[sum]);
	} else if ( sum >= 10 && sum < 100 ) {
		printf("%s ", pinyins[sum / 10]);
		printf("%s", pinyins[sum % 10]);
	} else if ( sum >= 100 && sum < 1000 ) {
		printf("%s ", pinyins[sum / 100]);
		printf("%s ", pinyins[sum % 100 / 10]);
		printf("%s", pinyins[sum % 10]);
	}
	
	return 0;
	
}
```

## 1003 我要通过！ （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805323154440192

注意点：理解题目，找出规律，设P之前A的数量为a，P与T之间A的数量为b，T之后A的数量为c，可知c = a * b。

答案：

```
#include<cstdio>
#include<cstring>
#include<vector> 

using namespace std;

main () {	
	int n;
	vector<int> passList;
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		char c[110];
		scanf("%s", c);
		int len1 = 0, len2 = 0, len3 = 0;
		int isPfind = -1, isTfind = -1, isAfind = -1;
		int cLen = strlen(c);
		int isLetterPass = -1;
		
		for (int j = 0; j < cLen; j++) {
			char temp = c[j];
			if (temp == 'P') {
				isPfind = j;
			} else if (temp == 'T') {
				isTfind = j;
			} else if (temp == 'A') {
				isAfind = 1;
			} else {
				isLetterPass = 1; // 含有其他字母 
			}
		}
		
		bool isPass = false;
		
		if (isTfind != -1 && isPfind != -1 && isAfind != -1 && isLetterPass == -1) {
			len1 = isPfind; // P之前A的数量a
			len2 = isTfind - isPfind - 1; // P与T之间A的数量b
			len3 = cLen - isTfind - 1; // T之后A的数量 c
			if ( len1 * len2 == len3 ) { // c = a * b
				isPass = true;
			}
		} 
		
		if (isPass) {
			passList.push_back(1);
		} else {
			passList.push_back(0);
		}
	}
	
	for (vector<int>::iterator it = passList.begin(); it != passList.end(); it++) {
		int temp = *it;
		if (temp == 1) {
			printf("YES\n");
		} else {
			printf("NO\n");
		}
	}
	
	return 0;
	
}
```

## 1004 成绩排名 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805321640296448

注意点：结构体使用，排序算法使用。

答案：

```
#include<cstdio>
#include<algorithm>
using namespace std;

struct Student{
	char name[12];
	char number[12];
	int score;	
};

bool cmp (Student A, Student B) {
	return A.score > B.score;
}

main () {	
	
	Student stuList[10000];
	int n;
	scanf("%d", &n);
	
	for (int i = 0; i < n; i++) {
		scanf("%s %s %d", stuList[i].name, stuList[i].number, &stuList[i].score);
	}
	
	sort(stuList, stuList + n, cmp);
	
	printf("%s %s\n", stuList[0].name, stuList[0].number);
	printf("%s %s", stuList[n - 1].name, stuList[n - 1].number);
	
	return 0;
}
```

## 1005 继续(3n+1)猜想 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805320306507776

注意点：考查hashTable的思想。专门开一个表用于验证是否出现过，表需要开的足够大（10000），否则会出现部分正确的情况。

答案：

```
#include<cstdio>
#include<algorithm>

using namespace std; 

bool cmp (int a, int b) {
	return a > b;
}

main () {
	int k;
	bool compareArr[10000] = { false };
	int numList[10000]; 
	bool isPrint = false;
	scanf("%d", &k);
	for (int i = 0; i < k; i++) {
		scanf("%d", &numList[i]);
		int n = numList[i];
		while (n != 1) {
			if (n % 2 == 0) {
				n = n / 2;
			} else {
				n = ( 3 * n + 1) / 2;
			}
			compareArr[n] = true;
		}	
	}
	sort(numList, numList + k, cmp);
	for (int j = 0; j < k; j++) {
		if (compareArr[numList[j]] == false) {
			if (!isPrint) {
				printf("%d", numList[j]);
				isPrint = true;	
			} else {
				printf(" %d", numList[j]);
			}	
		} 	
	}		
	return 0;
}
```

## 1006 换个格式输出整数 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805318855278592

注意点：注意边界条件，比如10，100的情况。

答案：

```
#include<cstdio>

main () {
	
	int num;
	
	int Bcount = 0, Scount = 0, Gcount = 0;
	
	scanf("%d", &num);
	
	if (num < 10) {
		Gcount = num;
	} else if ( num >= 10 && num < 100 ) {
		
		Scount = num / 10;
		Gcount = num % 10;
		
	} else if (num >= 100) {
		
		Bcount = num / 100;
		Scount = num % 100 / 10;
		Gcount = num % 10;
		
	}
	
	while (Bcount > 0) {
		printf("B");
		Bcount--;
	}
	while (Scount > 0) {
		printf("S");
		Scount--;
	}
	if (Gcount > 0) {
		for (int i = 0; i < Gcount; i++) {
			printf("%d", i + 1);
		}
	}
	
	return 0;
}
```

## 1007 素数对猜想 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805317546655744

注意点：素数判断，边界条件注意。

答案：

```
#include<cstdio>
#include<math.h>

bool isPrime (int n) {
	if (n <= 1) {
		return false;
	}
	int sqr = (int)sqrt(1.0 * n);
	for (int i = 2; i <= sqr; i++) {
		if (n % i == 0) {
			return false;
		}
	}
	return true;
}

main () {
	
	int N;
	int primeList[10000];
	int n = 0; // 素数的个数
	int count = 0; 
	
	scanf("%d", &N);
	
	for (int i = 1; i <= N; i++) {
		int flag = isPrime(i);
		if (flag) {
			primeList[n] = i;
			if (n > 0) {
				int dis = primeList[n] - primeList[n - 1];
				if (dis == 2) {
					count++;
				}
			}
			n++;
		}
	}
	
	printf("%d", count);
	
	return 0;
}
```

## 1008 数组元素循环右移问题 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805316250615808

注意点：计算输入数组与输出数组基于n，m的位置关系。

答案：

```
#include<cstdio>

main () {
	
	int n, m;
	int list[110];
	
	scanf("%d", &n);
	scanf("%d", &m);
	
	m = m % n; 
	
	for(int i = 0; i < n; i++) {
		scanf("%d", &list[i]);
	}
	
	for (int j = 0; j < n; j++) {
		int index = 0;
		if (j + n - m < n) {
			index = j + n - m;
		} else {
			index = j - m;
		}
		if (j > 0) {
			printf(" %d", list[index]);	
		} else {
			printf("%d", list[index]);
		}
		
	} 
	
	return 0;
}
```

## 1009 说反话 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805314941992960

注意点：利用stack倒序输出，注意cin与string的用法。

答案：

```
#include <iostream>
#include <stack>
using namespace std;
int main() {
    stack<string> v;
    string s;
    while(cin >> s) {
        v.push(s);
    }
    cout << v.top();
    v.pop();
    while(!v.empty()) {
        cout << " " << v.top();
        v.pop();
    }
    return 0;
}
```












