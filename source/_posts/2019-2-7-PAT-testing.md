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

PAT练习题列表地址（乙级）：https://pintia.cn/problem-sets/994805260223102976/problems

开发工具：Dev-C++ 5.11（尽量与考场接近）

参考用书：《算法笔记》 机械工业出版社

## 1001 害死人不偿命的(3n+1)猜想

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

### 1002 写出这个数

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

### 1003 我要通过！

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


  












