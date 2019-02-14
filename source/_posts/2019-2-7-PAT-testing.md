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

## 1010 一元多项式求导 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805313708867584

注意点：零多项式特殊处理，使用EOF的方式比使用数组存储的方式简洁高效。

答案：

```
#include<cstdio>

main () {
	
	int x, n;
	
	bool isZero = true; // 是否是零多项式 
	 
	while (scanf("%d%d", &x, &n) != EOF) {
		if (n > 0) { // 次数大于零 
			if (isZero == true) { // 第一项 
				isZero = false;
				printf("%d %d", x * n, n - 1); 
			} else {
				printf(" %d %d", x * n, n - 1);	
			}
		}
	}
	
	if (isZero == true) {
		printf("0 0");
	}
	
	return 0;
}
```

## 1011 A+B 和 C （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805312417021952

注意点：注意输入输出与取值范围。

答案：

```
#include<cstdio>

main () {
	
	long long a, b, c;
	int n;
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		scanf("%lld %lld %lld", &a, &b, &c);
		if (a + b > c) {
			printf("Case #%d: true\n", i + 1);
		} else {
			printf("Case #%d: false\n", i + 1);
		}
	}

	return 0;

}
```

## 1012 数字分类 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805311146147840

答案：

```
#include<cstdio>
#include<vector>

using namespace std;

main () {
	
	int n;
	
	int A1 = 0;
	vector<int> A2List;
	int A3 = 0;
	vector<int> A4List;
	int A5 = 0; 
	
	scanf("%d", &n);
	
	for (int i = 0; i < n; i++) {
		
		int tempNum;
		
		scanf("%d", &tempNum);
		
		int remain = tempNum % 5;
		
		if (remain == 0) {
			if (tempNum % 2 == 0) {
				A1 += tempNum;
			}
		}
		if (remain == 1) {
			A2List.push_back(tempNum);
		}
		if (remain == 2) {
			A3++;
		}
		if (remain == 3) {
			A4List.push_back(tempNum);
		}
		if (remain == 4) {
			if (A5) {
				A5 = A5 > tempNum ? A5 : tempNum;
			} else {
				A5 = tempNum;
			}
		}
		
	}
	
	// A1
	if (A1 == 0) {
		printf("N");
	} else {
		printf("%d", A1);
	}
	
	// A2
	if (A2List.size() == 0) {
		printf(" N");
	} else {
		int A2sum = 0;
		for (int j = 0; j < A2List.size(); j++) {
			if (j %2 == 0) {
				A2sum += A2List[j];
			} else {
				A2sum -= A2List[j];
			}
		}
		printf(" %d", A2sum);
	}
	
	// A3
	if (A3 == 0) {
		printf(" N");
	} else {
		printf(" %d", A3);
	}
	
	// A4
	if (A4List.size() == 0) {
		printf(" N");
	} else {
		int A4sum = 0;
		float average;
		for (int k = 0; k < A4List.size(); k++) {
			A4sum += A4List[k];
		}
		printf(" %.1f", A4sum * 1.0 / A4List.size());
	}
	
	// A5
	if (A5 == 0) {
		printf(" N");
	} else {
		printf(" %d", A5);
	}
	
	return 0;
}
```

## 1013 数素数 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805309963354112

答案：

```
#include<cstdio>
#include<vector>
#include<math.h>

using namespace std;

// 判断是否是素数 
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
	
	int n, m;
	vector<int> primeList;
	int temp = 2;
	
	scanf("%d %d", &n, &m);
	
	while (1) {
		bool res = isPrime(temp);
		if (res) {
			primeList.push_back(temp);
		}
		temp++;
		if (primeList.size() >= m) {
			break;
		}
	}
	
	int row = 0;
	for (int j = n - 1; j < m; j++) {
		
		if (row == 0) {
			printf("%d", primeList[j]);
			row++;	
		} else if (row > 0 && row < 9) {
			printf(" %d", primeList[j]);
			row++;
		} else if (row == 9) {
			printf(" %d\n", primeList[j]);
			row = 0;
		}
		
	}
	
	return 0;
}
```

## 1014 福尔摩斯的约会 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805308755394560

注意点：字符串的输入输出，字符范围的边界问题（A-G，A-N，A-Z）。

答案：

```
#include<cstdio>
#include<map>
#include<string>
#include<iostream>

using namespace std;

main () {
	
	map<int, string> DAY;
	DAY[1] = "MON";DAY[2] = "TUE";DAY[3] = "WED";DAY[4] = "THU";DAY[5] = "FRI";DAY[6] = "SAT";DAY[7] = "SUN";
	
	string str1, str2, str3, str4;
	
	cin >> str1 >> str2 >> str3 >> str4;
	
	bool isFindDay = false;
	
	for (int i = 0; i < str1.size(); i++) {
		if (str1[i] == str2[i]) {
			
			if (isFindDay) { // 已找到星期几
				
				if (str1[i] >= 'A' && str1[i] <= 'N') { // A到N（1-14） 
					cout << str1[i] - 'A' + 10 << ':';
					break; 
				} else if (str1[i] >= '0' && str1[i] <= '9') { // 是数字 
					cout << '0' << str1[i] << ':';
					break;
				} 
				
			} else {
				
				if (str1[i] >= 'A' && str1[i] <= 'G') { // A到G（1-7） 
					cout << DAY[str1[i] - 'A' + 1] << ' ';// 输出星期几
					isFindDay = true;
				}
				
			}
			
		}
	}
	
	for (int j = 0; j < str3.size(); j++) {
		if (str3[j] == str4[j]) {
			if (str3[j] >= 'a' && str3[j] <= 'z' || str3[j] >= 'A' && str3[j] <= 'Z') { // 英文字母，大小写均可 
				if (j < 10) {
					cout << '0' << j;
				} else {
					cout << j;
				}
				break;
			}
			
		}
	}
	
	return 0;
}
```

## 1015 德才论 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805307551629312

注意点：主要考察sort中的cmp函数，注意审题，注意边界条件。

```
#include<cstdio>
#include<vector>
#include<algorithm>

using namespace std;

struct Stu {
	int number; // 学号 
	int moralNum; // 德分 
	int talentNum; // 才分 
};

bool cmp (Stu a, Stu b) {
	if (a.moralNum + a.talentNum == b.moralNum + b.talentNum) {
		if (a.moralNum == b.moralNum) {
			return a.number < b.number;
		} else {
			return a.moralNum > b.moralNum;
		}
	} else {
		return (a.moralNum + a.talentNum) > (b.moralNum + b.talentNum);	
	}
}

void printAll (vector<Stu> list) {
	for (int i = 0; i < list.size(); i++) {
		printf("%d %d %d\n", list[i].number, list[i].moralNum, list[i].talentNum);
	}
}

main () {
	
	int N, // 考生总数 
		L, // 录取最低分数线 
		H; // 优先录取线 
	
	scanf("%d %d %d", &N, &L, &H);
	
	vector<Stu> group1; // 才德全尽 
	vector<Stu> group2; // 德胜才 
	vector<Stu> group3; // 才德兼亡 
	vector<Stu> group4; // 德胜才 
	
	for (int i = 0; i < N; i++) {
		
		int number, moralNum, talentNum;
		Stu tempStu;
		
		scanf("%d %d %d", &number, &moralNum, &talentNum);
		
		tempStu.number = number;
		tempStu.moralNum = moralNum;
		tempStu.talentNum = talentNum;
		
		if (tempStu.moralNum >= L && tempStu.talentNum >= L) {
			
			if (tempStu.moralNum >= H && tempStu.talentNum >= H) {// 才德全尽
				group1.push_back(tempStu);
			} else if (tempStu.moralNum >= H && tempStu.talentNum < H) {// 德胜才
				group2.push_back(tempStu);
			} else if (tempStu.moralNum < H && tempStu.talentNum < H && tempStu.moralNum >= tempStu.talentNum) {// 才德兼亡,但德胜才 
				group3.push_back(tempStu);
			} else {// // 才德兼亡,但才胜德
				group4.push_back(tempStu);
			}
			
		}
		
	}
	
	sort(group1.begin(), group1.end(), cmp);
	sort(group2.begin(), group2.end(), cmp);
	sort(group3.begin(), group3.end(), cmp);
	sort(group4.begin(), group4.end(), cmp);
	
	printf("%d\n", group1.size() + group2.size() + group3.size() + group4.size());
	
	printAll(group1);
	printAll(group2);
	printAll(group3);
	printAll(group4);
	
	return 0;
}
```

## 1016 部分A+B （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805306310115328

注意点：考察字符与数字的转化。

答案：

```
#include<cstdio>
#include<string>
#include<iostream>
#include<math.h>

using namespace std;

long long getP (string A, char Da) {
	
	long long p = 0;
	int count = 0;
	int tempNum = Da - '0';
	
	for (int i = 0; i < A.size(); i++) {
		if (A[i] == Da) {
			count++;
		}
	}
	
	for (int j = 0; j < count; j++) {
		p += tempNum * pow(10, j);
	}
	
	return p;
} 

main () {
	string A, B;
	char Da, Db;
	long long Asum, Bsum;
	
	cin >> A >> Da >> B >> Db;
	
	Asum = getP(A, Da);
	Bsum = getP(B, Db);
	
	printf("%lld", Asum + Bsum);
	
	return 0;
}
```

## 1017 A除以B （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805305181847552

注意点：考察大整数运算，需掌握大整数的加减乘除。

答案：

```
#include<cstdio>
#include<cstring>
#include<string>
#include<iostream>

using namespace std;

// 大整数结构 
struct bign {
	int n[1010];
	int len;
	bign () {
		memset(n, 0, sizeof(n));
		len = 0;
	}
};

// 将整数转化为大整数

bign convert (string n) {
	bign a;
	a.len = n.size();
	for (int i = 0; i < a.len; i++) {
		a.n[i] = n[a.len - 1 - i] - '0'; // 转化为int，并倒序摆放。 
	}
	return a;
}

// 大整数除法

bign divide (bign a, int b, int& r) {
	bign c;
	c.len = a.len;
	// 做除法，结果保留在c 
	for (int i = a.len -1; i >= 0; i--) {
		r = r*10 + a.n[i];
		if (r < b) { // 不够除 
			c.n[i] = 0;
		} else {
			c.n[i] = r / b;
			r = r % b;
		}
	} 
	// 处理c，去除高位的0，同时至少保留一位最低位 
	while (c.len - 1 >= 1 && c.n[c.len - 1] == 0) {
		c.len--;
	}
	return c;
}

// 打印大整数 
void printBign(bign a) {
	for (int i = a.len -1; i >= 0; i--) {
		printf("%d", a.n[i]);
	}
} 

main () {
	
	int b, r = 0; // 被除数，余数
	string number;
	bign c; // 商 
	
	cin >> number >> b;
	
	bign bigNumber = convert(number);
	c = divide(bigNumber, b, r);
	printBign(c); // 打印商 
	printf(" %d", r); // 打印余数 

	return 0;
}
```

## 1018 锤子剪刀布 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805304020025344

注意点：注意最后一个条件，“如果解不唯一，则输出按字母序最小的解”，即当获胜次数最多的手势相同的时候的策略，影响到数据的摆放。

答案：

```
#include<cstdio>
#include<iostream>

using namespace std; 

void compare (char a, char b, int aRes[], int bRes[], int aResCount[], int bResCount[]) {
	
	//	胜、平、负
	// J,C,B
	
	// 平局 
	if (a == b) {
		aRes[1]++;
		bRes[1]++;
	} 
	
	// 甲C胜 
	if (a == 'C' && b == 'J') {
		aRes[0]++;
		bRes[2]++;
		aResCount[1]++;
	}
	// 乙B胜
	if (a == 'C' && b == 'B') {
		aRes[2]++;
		bRes[0]++;
		bResCount[2]++;
	}
	// 乙C胜 
	if (a == 'J' && b == 'C') {
		aRes[2]++;
		bRes[0]++;
		bResCount[1]++;
	}
	// 甲J胜
	if (a == 'J' && b == 'B') {
		aRes[0]++;
		bRes[2]++;
		aResCount[0]++;
	}
	// 乙J胜
	if (a == 'B' && b == 'J') {
		aRes[2]++;
		bRes[0]++;
		bResCount[0]++;
	}
	// 甲B胜 
	if (a == 'B' && b == 'C') {
		aRes[0]++;
		bRes[2]++;
		aResCount[2]++;
	}
	
}

void printBest (int a[], bool flag) {
	
	int count = 0;
	int temp = 0;
	
	for (int i = 0; i < 3; i++) {
		
		if (a[i] >= temp) { // 注意，若相同的情况需要按字典顺序优先，即为BCJ顺序，故要">=" 
			count = i;
			temp = a[i];
		}
		
	}
	
	if (count == 0) {
		if (flag) {
			printf("J");	
		} else {
			printf(" J");
		}
	}
	if (count == 1) {
		if (flag) {
			printf("C");	
		} else {
			printf(" C");
		}
	}
	if (count == 2) {
		if (flag) {
			printf("B");	
		} else {
			printf(" B");
		}
	}
	
}

main () {
	
	int n;
	
	char a, b;
	
	// 结果记录 
	int aRes[3] = {0, 0, 0};
	int bRes[3] = {0, 0, 0};
	
	// 获胜次数手势 
	int aResCount[3] = {0, 0, 0};
	int bResCount[3] = {0, 0, 0};
	
	scanf("%d", &n);
	
	for (int i = 0; i < n; i++) {
		
		getchar();
		
		scanf("%c %c", &a, &b);
		
		compare(a, b, aRes, bRes, aResCount, bResCount);
		
	} 
	
	printf("%d %d %d\n", aRes[0], aRes[1], aRes[2]); 
	printf("%d %d %d\n", bRes[0], bRes[1], bRes[2]);
	
	printBest(aResCount, true);
	printBest(bResCount, false);
	
	return 0;
}
```

## 1019 数字黑洞 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805302786899968

注意点：主要在于数字与数字的数组的相互转化，注意printf技巧的使用。

答案：

```
#include<cstdio>
#include<algorithm>

using namespace std;

bool cmp (int a, int b) {
	return a > b;
}

void to_array (int n, int num[]) {
	for (int i = 0; i < 4; i++) {
		num[i] = n % 10;
		n = n / 10;
	}
} 

int to_number (int num[]) { 
	int n = 0;
	for (int i = 0; i < 4; i++) {
		n = n * 10 + num[i];
	}
	return n;
}

main () {
	int n;
	int MAX, MIN;
	int num[4];
	scanf("%d", &n);
	while (1) {
		to_array(n, num);
		sort(num, num + 4, cmp);
		MAX = to_number(num);
		sort(num, num + 4);
		MIN = to_number(num);
		n = MAX - MIN;
		printf("%04d - %04d = %04d\n", MAX, MIN, n);
		if (n == 6174 || n == 0) {
			break;
		}		
	}	
	return 0;
}
```

## 1020 月饼 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805301562163200

注意点：理解题意，策略为首先卖出单价最高的，最高的卖完了再依次补充。

答案：

```
#include<cstdio>
#include<algorithm>

using namespace std;

struct Mooncake {	
	double store; // 库存
	double totalSell; // 总售价
	double price; // 库存
};

bool cmp (Mooncake a, Mooncake b) {
	return a.price > b.price;
}

main () {
	
	int n; // 月饼种类数
	
	double D; // 市场最大需求量
	
	scanf("%d %lf", &n, &D);
	
	Mooncake cakeList[1010];
	
	for (int i = 0; i < n; i++) {
		scanf("%lf", &cakeList[i].store);
	}
	
	for (int i = 0; i < n; i++) {
		scanf("%lf", &cakeList[i].totalSell);
		cakeList[i].price = cakeList[i].totalSell / cakeList[i].store;
	}
	
	sort(cakeList, cakeList + n, cmp); // 从大到小排列，先买大的 
	
	double allIncome = 0;
	for (int i = 0; i < n; i++) {
		
		if (cakeList[i].store < D) {
			D = D - cakeList[i].store; // 当前全部卖掉
			allIncome = allIncome + cakeList[i].totalSell;	 
		} else {
			allIncome = allIncome + cakeList[i].price * D;
			break;
		}
	}
	
	printf("%.2lf", allIncome);
	
	return 0;
}
```

## 1021 个位数统计 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805300404535296

注意点：需要用大整数方式处理数据。

答案：

```
#include<cstdio>
#include<cstring>
#include<string>
#include<iostream>

using namespace std;

struct bign {
	int n[1010];
	int len;
	bign () {
		memset(n, 0, sizeof(n));
		len = 0;
	}
};

bign change (string str) {
	bign a;
	a.len = str.size();
	for (int i = 0; i < a.len; i++) {
		a.n[i] = str[i] - '0';
	}
	return a;
}

main () {
	string str;
	int countList[10];
	memset(countList, 0, sizeof(countList)); 
	cin >> str;
	bign num = change(str);
	for (int i = 0; i < num.len; i++) {
		countList[num.n[i]]++;
	}
	for (int i = 0; i < 10; i++) {
		if (countList[i] > 0) {
			printf("%d:%d\n", i, countList[i]);
		}
	}
	return 0;	
}
```

## 1022 D进制的A+B （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805299301433344

注意点：进制转换的问题，需要掌握P进制转化为10进制，与10进制转化为P进制，其他可以以十进制作为中介。

答案：

```
#include<cstdio>

main () {
	
	int A, B, D;
	scanf("%d %d %d", &A, &B, &D);
	int sum = A + B;
	int ans[100], len = 0;
	while (1) {
		ans[len++] = sum % D; // 取余
		sum = sum / D; // 除基
		if (sum == 0) {
			break;
		}
	}
	
	for (int i = len -1; i >= 0; i--) {
		printf("%d", ans[i]);
	}
	
	return 0;
}
```

## 1023 组个最小数 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805298269634560

注意点：策略为最高位打印除0以外最小的，其余的顺序从小到大按数量打印。

答案：

```
#include<cstdio>

main () {
	int list[10];
	for (int i = 0; i < 10; i++) {
		scanf("%d", &list[i]);
	}
	for (int i = 1; i < 10; i++) {
		if (list[i] > 0) {
			printf("%d", i);
			list[i]--;
			break;
		}
	}
	int pos = 0;
	while (1) {
		if (list[pos] > 0 && pos < 10) {
			printf("%d", pos);
			list[pos]--;
		} else {
			pos++;
		}
		if (pos >= 10) {
			break;
		}
	}
	return 0;
}
```

## 1024 科学计数法 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805297229447168

注意点：以处理字符串作为思路。

答案：

```
#include<cstdio>
#include<iostream>

using namespace std;

main () {
	string str;
	cin >> str;
	int len = str.size(); 
	int Epos; // E的位置
	int exp = 0; // 指数
	if (str[0] == '-') {
		printf("-");
	}
	// 找出E的位置 
	for (int i = 0; i < len; i++) {
		if (str[i] == 'E') {
			Epos = i;
		}
	}
	// 计算指数
	for (int i = Epos + 2; i < len; i++) {
		exp = exp * 10 + (str[i] - '0'); 
	}
	// 指数为0特判 
	if (exp == 0) {
		for (int i = 1; i < Epos; i++) {
			printf("%d", str[i]);
		}
	}
	if (str[Epos + 1] == '-') { // 指数为负	
		printf("0.");
		for(int i = 0; i < exp - 1; i++) {
			printf("0");
		}
        for(int i = 1;i < Epos; i++) {
        	if (str[i] == '.') continue;
            printf("%c", str[i]);
        }
	} else { // 指数为正 
		for (int i = 1; i < Epos; i++) {
			if (str[i] == '.') continue;
			printf("%c", str[i]);
			if (i == exp + 2 && exp + 3 != Epos) {
				printf(".");
			}
		}
		// 需补零 
		if (exp + 3 > Epos) {
			for (int i = 0; i < exp + 3 - Epos; i++) {
				printf("0");
			} 
		}
	}
	return 0;
}
```

## 1025 反转链表 （25 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805296180871168

注意点：根据《算法笔记》里的代码，没通过，直接超时了。后面再想办法。

答案：

```
#include<cstdio>
#include<algorithm>

using namespace std;

const int maxn = 100010;

struct Node { // 定义静态链表 
	int address, data, next;
	int order; // 节点在链表上的序号，无效节点记为maxn 
} node[maxn];

bool cmp (Node a, Node b) {
	return a.order < b.order;
} 

main () {
	
	for (int i = 0; i < maxn; i++) {
		node[i].order = maxn;
	}
	
	int begin, n, K, address;
	
	scanf("%d%d%d", &begin, &n, &K);	// 起始地址，节点个数，步长
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &address);
		scanf("%d", &node[address].data, &node[address].next);
		node[address].address = address;
	}
	
	// 所有有效节点，按照next加入order 
	int p = begin, count = 0;
	while (p != -1) {
		node[p].order = count++;
		p = node[p].next;
	}
	
	sort(node, node + maxn, cmp); // 排序，按order 
	
	// 有效节点为前count个节点 
	n = count;
	
	// 分为n / K块 
	for (int i = 0; i < n / K; i++) {
		
		// 完整的一块倒序输出 
		for (int j = (i + 1) * K - 1; j > 1 * K; j--) {
			printf("%05d %d %05d\n", node[j].address, node[j].data, node[j - 1].address);
		}
		
		// 每一块的最后一个结点的next地址的处理
		printf("%05d %d ", node[i * K].address, node[i * K].data); // 先输出每一块最后一个结点的address和data 
		
		if (i < n / K - 1) { // 如果不是最后一块，就指向下一块的最后一个结点 
			printf("%05d\n", node[(i + 2) * K - 1].address);
		} else {
			if (n % K == 0) {
				printf("-1\n"); // 恰好是最后一个结点，输出-1 
			} else { // 剩下不完整的块按原先的顺序输出 
				printf("%05d\n", node[(i + 1) * K].address);
				for (int i = n / K * K; i < n; i++) {
					printf("%05d %d", node[i].address, node[i].data);
					if (i < n - 1) {
						printf("%05d\n", node[i + 1].address);
					} else {
						printf("-1\n");
					}
				}
			}
		}
		
	}
	
	return 0; 
	
}
```

## 1026 程序运行时间 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805295203598336

注意点：注意四舍五入。

答案：

```
#include<cstdio>
#include<math.h>

main () {
	int C1, C2;
	scanf("%d %d", &C1, &C2);
	int time = (int)round((C2 - C1) / 100.0);
	int hh, mm, ss;
	int r;
	hh = time / 3600;
	r = time % 3600;
	mm = r / 60;
	ss = r % 60;
	printf("%02d:%02d:%02d", hh, mm, ss);
	return 0;
}
```

## 1027 打印沙漏 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805294251491328

注意点：***注意格式问题，沙漏后面的空格不要打印，十分坑。

答案：

```
#include<cstdio>

int main () {
	int n, prev = 0, i = 0, res;
	
	char tempStr;
	
	scanf("%d %c", &n, &tempStr);
	
	while (1) {
		int now;
		if (i == 0) {
			now = 1;
		} else {
			now = prev + 2 * ( 2 * i + 1 );
		}
		if (now > n) {
			res = n - prev;
			break;
		} else {
			prev = now;
			i++;	
		}
	}
	
	i = i - 1;
	
	int countLine = 0; 
	for (int k = 0; k < 2 * i + 1; k++) {
		int r = k < (2 * i + 1) / 2 ? k : 2 * i - k; // 当前行数打印空白的对半数量
		for (int j = 0; j < r; j++) {
			countLine++;
			printf(" ");
		}
		for (int j = 0; j < (2 * i + 1) - (2 * r); j++) {
			countLine++;
			printf("%c", tempStr);
		}
		countLine = 0;
		printf("\n");
	}
	
	printf("%d", res);
	
	return 0;
}
```

## 1028 人口普查 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805293282607104

注意点：关注下这个读取数据的方式。

答案：

```
#include<cstdio>


struct Birth {
	
	char name[6];
	int year;
	int month;
	int day;
	
};

bool isValid (Birth a) {
	if (a.year < 1814 || ( a.year == 1814 && a.month < 9) || ( a.year == 1814 && a.month == 9 && a.day < 6) ) {
		return false;
	}
	if (a.year > 2014 || ( a.year == 2014 && a.month > 9 ) || ( a.year == 2014 && a.month == 9 && a.day > 6)) {
		return false;
	}
	return true;
}

main () {
	
	int n;
	
	Birth MIN, MAX;
	int count = 0;
	
	scanf("%d", &n);
	
	Birth list[n];
	
	MAX.year = 2014;MAX.month = 9;MAX.day = 6;
	MIN.year = 1814;MIN.month = 9;MIN.day = 6;
	
	for (int i = 0; i < n; i++) {
		
		scanf("%s %d/%d/%d", list[i].name, &list[i].year, &list[i].month, &list[i].day);
		
		bool valid = isValid(list[i]);
		if (valid) {
			count++;
			if ( (list[i].year > MIN.year) || (list[i].year == MIN.year && list[i].month > MIN.month) || (list[i].year == MIN.year && list[i].month == MIN.month && list[i].day > MIN.day) ) {
				MIN = list[i];
			}
			if ( (list[i].year < MAX.year) || (list[i].year == MAX.year && list[i].month < MAX.month) || (list[i].year == MAX.year && list[i].month == MAX.month && list[i].day < MAX.day) ) {
				MAX = list[i];
			}
		}
	}

	if (count > 0) {
		printf("%d %s %s", count, MAX.name, MIN.name);
	} else {
		printf("0");
	}
	
	return 0;
} 
```

## 1029 旧键盘 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805292322111488

注意点：字符串处理。

答案：

```
#include<cstdio>
#include<string>
#include<iostream>
#include<vector>

using namespace std; 

main () {
	
	string str1, str2;
	vector<char> list;
	cin >> str1 >> str2;
	int offset = 0;
	for (int i = 0; i < str1.size(); i++) {
		if (str1[i] != str2[i - offset]) {
			offset++;
		}
		if (i - offset < 0 && i == 0) { // 第0个特判 	
			if (str1[i] >= 'a' && str1[i] <= 'z') {
				str1[i] = str1[i] - 32; // 转化为大写 
			}
			list.push_back(str1[i]);
		} else {
			if (str1[i] != str2[i - offset]) {
				if (str1[i] >= 'a' && str1[i] <= 'z') {
					str1[i] = str1[i] - 32; // 转化为大写 
				}
				int isRepeat = false;
				for(int j = 0; j < list.size(); j++) {
					if (str1[i] == list[j]) {
						isRepeat = true;
					} 
				}
				if (!isRepeat) {
					list.push_back(str1[i]);					
				}
			} 
		}
	}
	
	for (int k = 0; k < list.size(); k++) {
		printf("%c", list[k]);
	}
	
	return 0;
	
}
```

## 1030 完美数列 （25 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805291311284224

注意点：没理解透。采用二分查找防止超时，还有一种two pointers的方式。

答案：

```
// 二分查找解法
#include<cstdio>
#include<algorithm>

using namespace std;

const int maxn = 100010;

int n, p, a[maxn];

main () {
	scanf("%d%d", &n, &p);
	for (int i = 0; i < n; i++) {
		scanf("%d", &a[i]);
	}
	// 递增排序 
	sort(a, a + n);
	int ans = 1;
	for (int i = 0; i < n; i++) {
		int j = upper_bound(a + i + 1, a + n, (long long)a[i] * p) - a;
		ans = max(ans, j - i);
	}
	printf("%d\n", ans);
	return 0;
}
```

```
// two pointers解法
#include<cstdio>
#include<algorithm>

using namespace std;

main () {
	const int maxn = 100010;
	int n, p, a[maxn];
	
	scanf("%d%d", &n, &p);
	for (int i = 0; i < n; i++) {
		scanf("%d", &a[i]);
	}
	
	sort(a, a + n);
	
	int i = 0, j = 0, count = 1;
	while (i < n && j < n) {
		// j不断右移，直到恰好不满足条件
		while (j < n && a[j] <= (long long)a[i] * p) {
			count = max(count, j - i + 1);
			j++;
		}
		i++;
	}
	printf("%d\n", count);
	return 0;
}
```

## 1031 查验身份证 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805290334011392

注意点：

答案：

```
#include<cstdio>

using namespace std;

main () {
	
	char m[11] = {'1','0','X','9','8','7','6','5','4','3','2'};
	
	int wList[18] = {7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2};
	int n;
	scanf("%d", &n);
	
	char str[20];
	bool flag = true;
	for (int i = 0; i < n; i++) {
		int sum = 0;
		bool isAllNum = true;
		scanf("%s", str);
		for (int j = 0; j < 17; j++) {
			if (str[j] >= '0' && str[j] <= '9') {
				sum += (str[j] - '0') * wList[j];
			} else {
				isAllNum = false;
				break;
			}
		}
		int r = sum % 11;	
		char M = m[r]; // 校验码
		if (str[17] != M || isAllNum == false) {
			flag = false;
			printf("%s\n", str);
		}
	}
	if (flag) {
		printf("All passed");
	}
	
	return 0;
	
}
```

## 1032 挖掘机技术哪家强 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805289432236032

注意点：注意这题把字符当做数字使用的方式，以及getline与cin的区别，这题我原来用了cin，死活有一个点过不去，后来改了getline才可以。

答案：

```
#include<stdio.h>
#include<string>
#include<iostream>

using namespace std;

bool hashTable[128]= { 0 };//元素自己做下表

int main() {
	
	string str1, str2;
	
	getline(cin, str1);
	getline(cin, str2);
	
	for (int i = 0; i < str1.size(); i++) {
		hashTable[(int)str1[i]] = true;
		if (str1[i] >= 'A' && str1[i] <= 'Z') {
			hashTable[((int)str1[i]) + 32] = true;
		}
		if (str1[i] == '+') {
			for (int j = 'A'; j <= 'Z'; j++) {
				hashTable[(int)j] = true;
			}	
		}	
	}
	int count = 0;
	for (int k = 0; k < str2.size(); k++) {
		if (!hashTable[(int)str2[k]]) {
			printf("%c", str2[k]);
			count++;
		}
	}
	if (count == 0) {
		printf("\n");
	}
  return  0;
}
```

## 1034 有理数四则运算 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805287624491008

注意点：分数的四则运算，有套路，背下来。

答案：

```
#include<cstdio>
#include<algorithm>

using namespace std;

typedef long long ll;

struct Fraction {
	ll up, down;
};

ll gcd (ll a, ll b) {
	// 辗转相除法
	if (b == 0) { // 被除尽了 
		return a; // 返回公约数 
	} else {
		return gcd(b, a % b);
	}
}

// 化简 
Fraction reduction (Fraction result) {
	// 若分母为负 
	if (result.down < 0) {
		result.up = - result.up;
		result.down = - result.down;
	}
	// 若分子为0
	if (result.up == 0) {
		result.down = 1;
	} else {
		int d = gcd(abs(result.up), abs(result.down)); // 分子分母的最大公约数
		result.up /= d;
		result.down /= d; 
	}
	return result;
	
}
// 加法 
Fraction add (Fraction f1, Fraction f2) {
	Fraction result;
	result.up = f1.up * f2.down + f2.up * f1.down;
	result.down = f1.down * f2.down;
	return reduction(result);
}

// 减法
Fraction minu (Fraction f1, Fraction f2) {
	Fraction result;
	result.up = f1.up * f2.down - f2.up * f1.down;
	result.down = f1.down * f2.down;
	return reduction(result);
}

// 乘法
Fraction multi (Fraction f1, Fraction f2) {
	Fraction result;
	result.up = f1.up * f2.up;
	result.down = f1.down * f2.down;
	return reduction(result);
} 

//除法
Fraction divide (Fraction f1, Fraction f2) {
	Fraction result;
	result.up = f1.up * f2.down;
	result.down = f1.down * f2.up;
	return reduction(result);
}

// 输出
void showResult (Fraction r) {
	r = reduction(r);
	if (r.up < 0) printf("(");
	if (r.down == 1) {
		printf("%lld", r.up); // 整数	
	} else if (abs(r.up) / r.down) {
		printf("%lld %lld/%lld", r.up / r.down, abs(r.up) % r.down, r.down);
	} else {
		printf("%lld/%lld", r.up, r.down);
	}
	if (r.up < 0) printf(")");
}

int main () {
	
	Fraction a, b;
	
	scanf("%lld/%lld %lld/%lld", &a.up, &a.down, &b.up, &b.down);
	// 加法
	showResult(a);
	printf(" + ");
	showResult(b);
	printf(" = ");
	showResult(add(a, b));
	printf("\n");
	// 减法
	showResult(a);
	printf(" - ");
	showResult(b);
	printf(" = ");
	showResult(minu(a, b));
	printf("\n");
	// 乘法
	showResult(a);
	printf(" * ");
	showResult(b);
	printf(" = ");
	showResult(multi(a, b));
	printf("\n");
	// 除法 
	showResult(a);
	printf(" / ");
	showResult(b);
	printf(" = ");
	if (b.up == 0) {
		printf("Inf");
	} else {
		showResult(divide(a, b));	
	}
	
	return 0;
}
```

## 1035 插入与归并 （25 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805287624491008

注意点：插入排序与归并排序的应用。

```
PAT乙级需要掌握的排序算法：
一、基本排序算法：1. 冒泡排序 2. 选择排序	3. 插入排序
二、高级排序算法：2. 归并排序（two pointer）2. 快速排序（two pointer）
```

答案：

```
#include<cstdio>
#include<algorithm>

using namespace std;

const int N = 111;
int origin[N], tempOri[N], changed[N]; // 原始数组，原始数组备份，目标数组
int n;

// 判断数组是否相同 
bool isSame (int A[], int B[]) {
	for (int i = 0; i < n; i++) {
		if (A[i] != B[i]) return false;
	}
	return true;
}

// 输出数组 
bool showArray(int A[]) {
	for (int i = 0; i < n; i++) {
		printf("%d", A[i]);
		if (i < n - 1) {
			printf(" ");
		}
	}
	printf("\n");
}

// 插入排序
bool insertSort () {
	bool flag = false; // 是否有与目标数组相同
	for (int i = 1; i < n; i++) {
		if (i != 1 && isSame(tempOri, changed))	{
			flag = true; // 与目标相同且不是初始状态 
		}
		// 插入排序过程
		int temp = tempOri[i], j = i;
		while (j > 0 && tempOri[j - 1] > temp) {
			tempOri[j] = tempOri[j - 1];
			j--;
		}
		tempOri[j] = temp;
		if (flag == true) {
			return true;	// 如果flag为true，则说明已达到目标数组，返回true 
		}
	}
	return false;	// 无相同目标数组 
}

// 归并排序
void mergeSort () {
	bool flag = false;
	for (int step = 2; step / 2 <= n; step *= 2) {
		if (step != 2 && isSame(tempOri, changed)) {
			flag = true;
		}
		for(int i = 0; i < n; i += step) {
			sort(tempOri + i, tempOri + min(i + step, n));
		}
		if (flag == true) {
			showArray(tempOri);
			return;
		}
	}
} 

main () {
	scanf("%d", &n);
	// 备份 
	for (int i = 0; i < n; i++) {
		scanf("%d", &origin[i]);
		tempOri[i] = origin[i];
	}
	for (int i = 0; i < n; i++) {
		scanf("%d", &changed[i]); // 目标数组 
	}
	if (insertSort()) {
		printf("Insertion Sort\n");
		showArray(tempOri);
	} else {
		printf("Merge Sort\n");
		for (int i = 0; i < n; i++) {
			tempOri[i] = origin[i];
		}
		mergeSort();
	}
	return 0;
}
```
## 1036 跟奥巴马一起编程 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805285812551680

答案：

```
#include<cstdio>
#include<math.h>

main () {
	int n;
	char str;
	
	scanf("%d %c", &n, &str);
	int row = round(n / 2.0);
	int column = n;
	for (int i = 0; i < row; i++) {
		for (int j = 0; j < column; j++) {
			if (i == 0 || i == row - 1) {
				if (j == column - 1) {
					printf("%c\n", str);	
				} else {
					printf("%c", str);
				}
			} else {
				if (j == column - 1) {
					printf("%c\n", str);	
				} else if (j == 0){
					printf("%c", str);
				} else {
					printf(" ");
				}
			}
		}
	}
	
	return 0;
}
```

## 1037 在霍格沃茨找零钱 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805284923359232

注意点：进制转换。

答案：

```
#include<cstdio>
#include<math.h>

main () {
	
	int Galleon1, Sickle2, Knut3;
	int Galleon4, Sickle5, Knut6;
	
	scanf("%d.%d.%d", &Galleon1, &Sickle2, &Knut3);
	scanf("%d.%d.%d", &Galleon4, &Sickle5, &Knut6);
	
	int sum1;
	int sum2;
	int sum3;
	
	sum1 = Knut3 + Sickle2 * 29 + Galleon1 * 29 * 17;
	sum2 = Knut6 + Sickle5 * 29 + Galleon4 * 29 * 17;
	
	sum3 = sum2 - sum1;
	
	int plus;
	
	if (sum3 < 0) {
		plus = -1;
	} else {
		plus = 1;
	}
	
	sum3 = abs(sum3);
	
	printf("%d.%d.%d", plus * (sum3 / 493), sum3 / 29 % 17, sum3 % 29);
	return 0;
} 
```

## 1038 统计同成绩学生 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805284092887040

注意点：利用map的思想，不然会超时。

答案：

```
#include<cstdio>

int map[100010] = { 0 };
main () {
	int n;
	scanf("%d", &n);
	
	for (int i = 0; i < n; i++) {
		int temp;
		scanf("%d", &temp);
		map[temp]++;
	}
	
	int m;
	scanf("%d", &m);
	
	for (int j = 0; j < m; j++) {
		
		int temp2;
		scanf("%d", &temp2);
	
		if (j == 0) {
			printf("%d", map[temp2]);
		} else {
			printf(" %d", map[temp2]);
		}
		
	}
	return 0;
} 
```


## 1039 到底买不买 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805283241443328


注意点：利用hashTable的思想，把字符的ASCII码作为hash值。

答案：

```
#include<cstdio>
#include<iostream>
#include<string>

using namespace std;

main () {
	
	int hashTable1[128] = { 0 };
	
	string str1, str2;
	
	getline(cin, str1);
	getline(cin, str2);
	
	int len = str1.size();
	
	for (int i = 0; i < str1.size(); i++) {
		hashTable1[str1[i]]++;
	}
	
	int lessCount = 0;
	
	for (int i = 0; i < str2.size(); i++) {
		
		if (hashTable1[str2[i]] > 0) {
			len--;			
			hashTable1[str2[i]]--;
		} else {
			lessCount++;
		}
	}
	
	if (lessCount > 0) {
		printf("No %d", lessCount);
	} else {
		printf("Yes %d", len);
	}
	
	return 0;
}
```

## 1040 有几个PAT （25 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805282389999616

注意点：原理，累加每个A左边P的个数与右边T的个数的乘积，注意结果取模要在过程中，否则会溢出。B1045的思想类似。

答案：

```
#include<iostream>
#include<string>

using namespace std;

const int MAXN = 100010;

int main () {
	
	int leftPNum[MAXN] = { 0 };
	
	string str;
	
	cin >> str; 
	
	// 统计每一位从左往右数的P的数量 
	for (int i = 0; i < str.size(); i++) {
		if (i > 0) {
			leftPNum[i] = leftPNum[i - 1]; // 继承上一位的数目 
		}
		if (str[i] == 'P') {
			leftPNum[i]++;
		}
	}
	
	int count = 0;
	int rightTnum = 0;
	
	for (int i = str.size() - 1; i >= 0; i--) {
		
		if (str[i] == 'T') {
			rightTnum++;
		} else if (str[i] == 'A') {
			count = (count + leftPNum[i] * rightTnum ) % 1000000007; // 必须在这里取模，否则会在还没输出之前溢出 
		}
		
	}
	
	printf("%d", count);
	
	return 0;
}
```


## 1041 考试座位号 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805281567916032

答案：

```
#include<cstdio>
#include<vector>

using namespace std;

struct Stu {
	char n[15];
	int testSeat;
	int seat;
}; 

main () {
	int n;
	vector<Stu> list;
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		Stu stu;
		scanf("%s %d %d", &stu.n, &stu.testSeat, &stu.seat);
		list.push_back(stu);
	}
	int m;
	scanf("%d", &m);
	for (int j = 0; j < m; j++) {
		int num;
		scanf("%d", &num);
		for (int k = 0; k < list.size(); k++) {
			if (list[k].testSeat == num) {
				printf("%s %d\n", list[k].n, list[k].seat);		
			}
		}	
	}
	
	return 0;
}
```

## 1042 字符统计 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805280817135616

注意点：同样是字符处理问题，注意ASCII字符与数字的转化，还有哈希表的思想。

答案：

```
#include<cstdio>
#include<iostream>
#include<string>

using namespace std;

main () {
	
	string str;
	int hashTable[128] = { 0 };
	
	getline(cin, str);
	
	for (int i = 0; i < str.size(); i++) {
		int code;
		if (str[i] >= 'A' && str[i] <= 'Z') {
			code = str[i] + 32;
			hashTable[code]++;
		} else if (str[i] >= 'a' && str[i] <= 'z') {
			code = str[i];
			hashTable[code]++;
		}
	}
	
	int maxN = 0;
	int c;
	
	for(int i = 'a'; i <= 'z'; i++)
    {
        if(hashTable[i] > maxN) {
            maxN = hashTable[i];
            c = i;
        }
    }
	
	printf("%c %d", c, maxN);
	
	return 0;
}
```
## 1043 输出PATest （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805280074743808

注意点：直接暴力输出。

答案：

```
#include <iostream>
#include <string>

using namespace std;
 
int main()
{
	string s;
	cin >> s;
	int length = s.length();
	int a[6] = { 0 };
	for (int  i = 0; i < length; i++)
	{
		if (s[i] == 'P')
		{
			a[0] ++;
		}
		else if (s[i] == 'A')
		{
			a[1] ++;
		}
		else if (s[i] == 'T')
		{
			a[2] ++;
		}
		else if (s[i] == 'e')
		{
			a[3] ++;
		}
		else if (s[i] == 's')
		{
			a[4] ++;
		}
		else if (s[i] == 't')
		{
			a[5] ++;
		}
	}
	for (int i = 0; i < length; i++)
	{
		if (a[0] != 0)
		{
			cout << "P";
			a[0]--;
		}
		if (a[1] != 0)
		{
			cout << "A";
			a[1]--;
		}
		if (a[2] != 0)
		{
			cout << "T";
			a[2]--;
		}
		if (a[3] != 0)
		{
			cout << "e";
			a[3]--;
		}
		if (a[4] != 0)
		{
			cout << "s";
			a[4]--;
		}
		if (a[5] != 0)
		{
			cout << "t";
			a[5]--;
		}
	}
	
	return 0;
}
```
## 1044 火星数字 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805279328157696

注意点：本质上是进制转化问题。

答案：

```

```

## 1045 快速排序 （25 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805278589960192

注意点：暴力会超时。思路原理与B1040一样，都是关注一个元素左边所有与右边所有的情况。

答案：

```
#include<cstdio>
#include<vector>

using namespace std;

const int MAXN = 100010;

main () {
	
	int n;
	
	int a[MAXN], leftMax[MAXN], rightMin[MAXN];
	
	vector<int> ans;
	
	scanf("%d", &n);
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &a[i]);
	}
	
	leftMax[0] = 0;
	
	// 找出i之前最大的 
	for (int i = 1; i < n; i++) {
		if (leftMax[i - 1] > a[i - 1]) {
			leftMax[i] = leftMax[i - 1];
		} else {
			leftMax[i] = a[i - 1];
		}
	}
	
	rightMin[n -1] = 1000000000; // 一个很大的数字 
	// 找出i之后最小的
	for (int i = n - 2; i >= 0; i--) {
		if (rightMin[i + 1] < a[i + 1]) {
			rightMin[i] = rightMin[i + 1];
		} else {
			rightMin[i] = a[i + 1];
		}
	} 
	
	for (int i = 0; i < n; i++) {
		if (leftMax[i] < a[i] && rightMin[i] > a[i]) { // i之前都比它小，i之后都比它大，即为主元 
			ans.push_back(a[i]);
		}
	}
	
	printf("%d\n", ans.size());
	
	for (int i = 0; i < ans.size(); i++) {
		if (i == 0) {
			printf("%d", ans[i]);
		} else {
			printf(" %d", ans[i]);
		}
	}
	
	if (ans.size() == 0) {
		printf("\n");
	}
	
	return 0;
}
```



