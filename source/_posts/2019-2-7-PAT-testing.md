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

考试时间：2019年3月2日星期六下午1点30分 (北京时间)。

考试地点：福州大学新区数计学院5号楼。

考试环境：福州大学： 张栋, zhangdong@fzu.edu.cn
Dev C++ 5.10；Code::Blocks 16.01；Java SE Development Kit 9.0.1；Eclipse Oxygen.2 4.7.2；Python解释器（3.6.5）；PyCharm Community Edition

PAT练习题列表地址（乙级）：https://pintia.cn/problem-sets/994805260223102976/problems

开发工具：Dev-C++ 5.11（尽量与考场接近）

参考用书：《算法笔记》 机械工业出版社

## 注意

1. C/C++的主函数必须定义为整型，即“int main()”; 程序正常结束必须返回0，即“return 0;”否则将会得到返回非零错误。

## 1001 害死人不偿命的(3n+1)猜想 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805325918486528

分类：简单模拟

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

注意点：根据《算法笔记》里的代码，没通过，直接超时了。后面再想办法。改用柳婼的。

答案：

```
#include <iostream>

using namespace std;

int main() {
	
    int first, k, n, sum = 0;
    
    cin >> first >> n >> k;
    int temp, data[100005], next[100005], list[100005], result[100005];
    for (int i = 0; i < n; i++) {
        cin >> temp;
        cin >> data[temp] >> next[temp];
    }
    while (first != -1) {
        list[sum++] = first;
        first = next[first];
    }
    for (int i = 0; i < sum; i++) result[i] = list[i];
    for (int i = 0; i < (sum - sum % k); i++)
        result[i] = list[i / k * k + k - 1 - i % k];
    for (int i = 0; i < sum - 1; i++)
        printf("%05d %d %05d\n", result[i], data[result[i]], result[i + 1]);
    printf("%05d %d -1", result[sum - 1], data[result[sum - 1]]);
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

注意点：

答案：

```
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int N;
    cin >> N;
    vector<int> a(N + 1);
    int num, score;
    for (int i = 0; i < N; i++) {
        cin >> num >> score;
        a[num] += score;
    }
    int max = a[1], t = 1;
    for (int i = 2; i <= N; i++) {
        if (max < a[i]) {
            max = a[i];
            t = i;
        }
    }
    cout << t << " " << max;
    return 0;
}
```

## 1033 旧键盘打字 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805288530460672

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
//	cin >> str1 >> str2;
	
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
## 1044 火星数字 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805279328157696

注意点：本质上是进制转化问题。注意substr的使用，注意getchar获取多余空格技巧。

答案：

```
#include<cstdio>
#include<string>
#include<iostream>

using namespace std;

string mars1[13] = {"tret", "jan", "feb", "mar", "apr", "may", "jun", "jly", "aug", "sep", "oct", "nov", "dec"}; // 低位 

string mars2[13] = {"####", "tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mer", "jou"}; // 高位 

// 数字转火星文 
void convertToMars (string str) {
	int num = 0;
	for (int i = 0; i < str.size(); i++) {	
		num = num * 10 + (str[i] - '0');
	}
	
	// 高位
	if (num / 13) {
		cout << mars2[ num / 13 ];
	}
	
	// 空格
	if ((num / 13) && (num % 13)) {
		cout << " ";
	}
	
	// 低位
	if (num % 13 || num == 0) {
		cout << mars1[num % 13];
	} 
	
}

// 火星文转数字
void marsToConvert (string str) {

	int t1 = 0, t2 = 0;
	
	string s1, s2;
	
	s1 = str.substr(0, 3);
	if (str.size() > 4) {
		s2 = str.substr(4, 3);
	}
	
	for (int j = 1; j <= 12; j++) {
		if (s1 == mars1[j] || s2 == mars1[j]) {
			t2 = j; // 低位 
		}
		if (s1 == mars2[j]) {
			t1 = j; // 高位 
		}
	}
	
	cout << t1 * 13 + t2; 
	
}

main () {
	
	int n;
	
	cin >> n;
	getchar();
	
	for (int i = 0; i < n; i++) {	
		
		string str;
		getline(cin, str);
		
		if (str[0] >= '0' && str[0] <= '9') {
			// 数字转火星文 
			convertToMars(str);
		} else {
			// 火星文转数字 
			marsToConvert(str);
		}
		cout << endl;
	}
	return 0;
} 
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

## 1046 划拳 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805277847568384

答案：

```
#include<cstdio>

main () {
	
	int n;
	
	scanf("%d", &n);
	
	int aCount = 0, bCount = 0;
	
	for (int i = 0; i < n; i++) {
		int a1, r1, a2, r2;
		scanf("%d %d %d %d", &a1, &r1, &a2, &r2);	
		if (a1 + a2 == r1 && a1 + a2 != r2) {
			bCount++;
		} else if (a1 + a2 == r2 && a1 + a2 != r1) {
			aCount++;
		}
	}
	
	printf("%d %d", aCount, bCount);
	
	return 0;
}
```

## 1047 编程团体赛 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805277163896832

答案：

```
#include<cstdio>

main () {
	
	int n;
	
	scanf("%d", &n);
	int hashTable[10010] = { 0 };
	
	for (int i = 0; i < n; i++) {
		
		int teamNum, playerNum, score;
		
		scanf("%d-%d %d", &teamNum, &playerNum, &score);
		
		hashTable[teamNum] += score;
		
	}
	
	int maxTeam, maxScore = 0;
	
	for (int i = 0; i < 10010; i++) {
		if (hashTable[i] > maxScore) {
			maxScore = hashTable[i];
			maxTeam = i;
		}
	}
	
	printf("%d %d", maxTeam, maxScore);
	return 0;
}
```

## 1048 数字加密 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805276438282240

注意点：注意在string类型下，字符串相加的技巧。

答案：

```
#include<cstdio>
#include<string>
#include<iostream>

using namespace std;

main () {
	
	string str1, str2;
	
	string t = "0123456789JQK";
	cin >> str1 >> str2;
	
	int max;
	int len1 = str1.size(), len2 = str2.size();
	
	max = len1 > len2 ? len1 : len2;
	
	// 补零 
	if (len1 > len2) {
		for (int i = 0; i < len1 - len2; i++) {
			str2 = '0' + str2;
		}
	} else {
		for (int i = 0; i < len2 - len1; i++) {
			str1 = '0' + str1;
		}
	}
	
	string s = ""; 
	
	for (int i = max - 1; i >= 0; i--) {
		int loc = max - i;
		
		if (loc % 2 == 0) { // 偶数
			s = t[((str2[i] - '0') - (str1[i] - '0') + 10) % 10] + s;
		} else { // 奇数
			s = t[((str1[i] - '0') + (str2[i] - '0')) % 13] + s;
		}
	}
	
	cout << s;
	return 0;
}
```

## 1049 数列的片段和 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805275792359424

注意点：https://www.jianshu.com/p/937a367ae4ea。数学问题。

答案：

```
#include <stdio.h>

int main()
{
    int N;
    double ai, sum = 0;

    scanf("%d", &N);
    for(int i = 0; i < N; i++)
    {
        scanf("%lf", &ai);
        /* ai is put at the beginning to avoid overflow */
        sum += ai * (i + 1) * (N - i);
    }
    printf("%.2lf", sum);

    return 0;
}
```

## 1050 螺旋矩阵 （25 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805275146436608

注意点：还需要再理解下。

答案：

```
// 用这三个会超时 
//#include<cstdio>
//#include<algorithm>
//#include<math.h>

#include<bits/stdc++.h>

using namespace std;
 
int a[10000][1000] = { 0 }; // 螺旋矩阵 
int s[10000]; // 原数组 
 
bool cmp(int a, int b){
    return a > b;
}

int main(){
	
    int n,i,j,x,y,r,c,tot,minn = 9999;
   	
   	// 输入 
    scanf("%d",&n);
    for(int i = 0; i < n; i++) {
    	scanf("%d", &s[i]);	
	}
	// 排序 
    sort(s, s + n, cmp);
    
    // 计算行列 
    for(i = 1; i <= sqrt(n * 1.0); i++)
    {
        if(n % i==0)
        {
            if(n / i - i < minn){
                minn = n / i - i;
                r = i;
            }
        }        
    }
    c = n / r; //c>r c行r列
	 
    a[1][1] = s[0]; // 初始点 
    tot = 0; // 总数 
	x = y = 1; // 初始化位置 
	
    while(tot < r * c-1) // 是否排满 
    {	
    	// 向右走 
        while(y + 1 <= r && ! a[x][y + 1]) {
        	a[x][++y] = s[++tot];
		}
		// 向下走 
        while(x + 1 <= c && !a[x + 1][y]) {
        	a[++x][y] = s[++tot];
		}
		// 向左走 
        while(y - 1 > 0 && !a[x][y - 1]) {
        	a[x][--y] = s[++tot];
		}
		// 向上走 
        while(x - 1 > 0 && !a[x - 1][y]) {
        	a[--x][y] = s[++tot];
		}
    }
    
    // 打印结果 
    for(i = 1; i <= c; i++) {
        printf("%d", a[i][1]);
        for(j=2; j <= r; j++) {
            printf(" %d", a[i][j]);
        } 
        printf("\n");
        
    }
    return 0;
}
```

## 1051 复数乘法 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805274496319488

注意点：三角恒等公式，复数的乘法。注意精度小于三位的情况要设为0。

答案：

```
#include <stdio.h>
#include <math.h>
 
main() {
	
    double r1, r2, p1, p2;
    double a, b;
    
    scanf("%lf %lf %lf %lf", &r1, &p1, &r2, &p2);
    
    a = (r1 * r2) * cos(p1 + p2); // r1 * r2 (cosp1cosp2 - sinp1sinp2) 
    b = (r1 * r2) * sin(p1 + p2); // r1 * r2 (sinp1cosp2 + cosp1sinp2)
    
    if(fabs(a) < 0.01){
        a = 0;
    }
    
    if(fabs(b) < 0.01){
        b = 0;
    }
	 
    if (b < 0) {
        printf("%.2lf-%.2lfi", a, fabs(b));
    } else {
        printf("%.2lf+%.2lfi", a, b);
    }
    return 0;
}
```

## 1052 卖个萌 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805273883951104

注意点：字符串处理。

答案：

```
#include<iostream>
#include<string>
#include<vector>

using namespace std;

main () {
	
	vector<string> hand;
	vector<string> eye;
	vector<string> mouth;
	
	for (int i = 0; i < 3; i++) {
		string str;
		getline(cin, str);
		
		vector<string> tempVector;
		
		int j = 0, k = 0;
		while (j < str.size()) {
			
			if (str[j] == '[') {
				string tempStr = "";
				k = j + 1;
				while (str[k] != ']') {
					tempStr = tempStr + str[k];
					k++;
				}
				tempVector.push_back(tempStr);
			}
			j++;
		}
		
		if (i == 0) {
			hand = tempVector;
		} else if (i == 1){
			eye = tempVector;
		} else if (i == 2) {
			mouth = tempVector;
		}
	}
	
	int m;
	
	cin >> m;
	
	for (int i = 0; i < m; i++) {
		int a, b, c, d, e;
		cin >> a >> b >> c >> d >> e;
		if (a > hand.size() || b > eye.size() || c > mouth.size() || d > eye.size() || e > hand.size() || a < 1 || b < 1 || c < 1 || d < 1 || e < 1) {
			cout << "Are you kidding me? @\\/@" << endl;
			continue;
		}
		cout << hand[a - 1] << "(" << eye[b - 1] << mouth[c - 1] << eye[d - 1] << ")" << hand[e - 1] << endl;
	} 
	
	return 0;
}
```

## 1053 住房空置率 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805273284165632

注意点：注意用printf输出%和\的技巧。`%%`,`\\`

答案：

```
#include<cstdio>

main () {
	
	int n, D; // D观察期阈值 
	
	double e; // e阈值
	
	double ansA = 0, ansB = 0;
	
	scanf("%d %lf %d", &n, &e, &D);
	
	for (int i = 0; i < n; i++) {
		
		int m;
		int count = 0;
		
		scanf("%d", &m);
		
		for (int j = 0; j < m; j++) {
			double t;
			scanf("%lf", &t);
			if (t < e) {
				count++;
			}
		}
		
		if (count > m / 2 && m > D) {
			ansB++; // 空置 
		} else if (count > m / 2 && m <= D) {
			ansA++; // 可能空置 
		}
		
	}
	
	printf("%.1lf%% %.1lf%%", (ansA / n) * 100, (ansB / n) * 100);
	
	return 0;
}
```

## 1054 求平均值 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805272659214336

注意点：用sscanf和sprintf处理字符串数据。

答案：

```
#include <iostream>
#include <cstdio>
#include <string.h>

using namespace std;

int main() {
    int n, cnt = 0;
    
    char a[50], b[50];
    
    double temp, sum = 0.0;
    
    cin >> n;
    
    for(int i = 0; i < n; i++) {
    	
        scanf("%s", a);
        
        sscanf(a, "%lf", &temp); // 把字符串以double类型赋给temp
        
//      cout << "temp: " << temp << endl;
        
        sprintf(b, "%.2f", temp); // 把temp以.2double赋给b
		
//		cout << "a:" << a << " b:" << b << endl;
        
        int flag = 0;
        
        for(int j = 0; j < strlen(a); j++) {
        	if(a[j] != b[j]) flag = 1;
		}
            
        if(flag || temp < -1000 || temp > 1000) {
            printf("ERROR: %s is not a legal number\n", a);
            continue;
        } else {
            sum += temp;
            cnt++;
        }
    }
    if(cnt == 1) {
    	printf("The average of 1 number is %.2f", sum);
	} else if(cnt > 1) {
		printf("The average of %d numbers is %.2f", cnt, sum / cnt);
	} else {
		printf("The average of 0 numbers is Undefined");
	}
        
    return 0;
}
```

## 1055 集体照 （25 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805272021680128

注意点：自己独立做一遍。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

struct node {
    string name;
    int height;
};

int cmp (struct node a, struct node b) {
    return a.height != b.height ? a.height > b.height : a.name < b.name; // 身高不等，身高大的排前，身高相等，身高小的排前。 
}

int main() {
	
    int n, k, m;
    
    cin >> n >> k; // n个人k排 
    
    vector<node> stu(n);
    
    for(int i = 0; i < n; i++) {
        cin >> stu[i].name >> stu[i].height;
    }
    // 排序 
    sort(stu.begin(), stu.end(), cmp);
    
    int t = 0, row = k;
    
    while(row) {
    	
        if(row == k) {
			m = n - n / k * (k - 1); // 最高一排人数 
		}
        else {
        	m = n / k; // 其余各排人数 
		}
		
        vector<string> ans(m);
        ans[m / 2] = stu[t].name; // 中间最高的人 
        
        // 左边一列
        int j = m / 2 - 1;
        for(int i = t + 1; i < t + m; i = i + 2) {
        	ans[j--] = stu[i].name; // 从高到低间隔放入左边 
		}
        // 右边一列
        j = m / 2 + 1;
        for(int i = t + 2; i < t + m; i = i + 2) {
        	ans[j++] = stu[i].name; // 从高到低间隔放入右边 
		}
        // 输出当前排
        cout << ans[0];
        for(int i = 1; i < m; i++)
            cout << " " << ans[i];
        cout << endl;
        
        // 换下一排 
        t = t + m;
        row--;
    }
    
    return 0;
}
```

## 1056 组合数的和 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805271455449088

答案：

```
#include <cstdio>

using namespace std;

int main() {
    
	int n;
	
	int sum = 0;
	
	scanf("%d", &n);
	
	int a[10];
	
	for(int i = 0; i < n; i++) {
		
		scanf("%d", &a[i]);
		
	}
	
	for (int i = 0; i < n; i++) {
		
		int temp = a[i];	
		for (int j = 0; j < n; j++) {
			if (j != i) {
				sum += a[i]*10 + a[j];	
			}
		}
		
	}
	
	printf("%d", sum);
    return 0;
}
```

## 1057 数零壹 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805270914383872

注意点：考察进制转换。

答案：

```
#include<cstdio>
#include<string>
#include<iostream>
#include<vector>

using namespace std;

main () {
	
	string str;
	getline(cin, str);
	int sum;
	
	for (int i = 0; i < str.size(); i++) {
		char temp = str[i];
		int num = 0;
		if (temp >= 'a' && temp <= 'z') {
			num = temp - 'a' + 1;
			sum += num;
		}
		if (temp >= 'A' && temp <= 'Z') {
			num = temp - 'A' + 1;
			sum += num;
		}	
	}
	
	int r;
	int count1 = 0, count2 = 0;
	
	while (sum > 0) {
		r = sum % 2;
		if (r == 1) {
			count1++;
		} else if (r == 0) {
			count2++;
		}
		sum = sum / 2;
	}
	
	printf("%d %d", count2, count1);
	
	return 0; 
} 
```

## 1058 选择题 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805270356541440

注意点：不难，但比较麻烦。

答案：

```
#include<cstdio>

struct Ques {
	int allScore; // 满分值 
	int selectNum; // 选项个数
	int rSelectNum; // 正确选项个数
	char select[6];
};

main () {
	
	int N, M; // 学生人数，多选题的个数
	
	scanf("%d %d", &N, &M);
	
	Ques list[M];
	
	int wrongAns[M] = { 0 };
	
	for (int i = 0; i < M; i++) {
		scanf("%d %d %d", &list[i].allScore, &list[i].selectNum, &list[i].rSelectNum);
		for (int j = 0; j < list[i].rSelectNum; j++) {
			getchar(); // 获取空格 
			scanf("%c", &list[i].select[j]);
		}
	}
	
	for (int i = 0; i < N; i++) {
		
		getchar();
		
		int score = 0;
		for (int j = 0; j < M; j++) {
			
			bool flag = false;
			
			if (j != 0) {
				getchar(); // 空格 
			}
			
			int rNum;
			scanf("(%d", &rNum);
			
			char c;
			if (rNum == list[j].rSelectNum) {
				bool isSame = true;
				for (int k = 0; k < rNum; k++) {	
					scanf(" %c", &c);
					if (c != list[j].select[k]) {
						isSame = false;
					}
				}
				if (isSame) {
					flag = true;
				}
			} else {
				for (int k = 0; k < rNum; k++) {	
					scanf(" %c", &c);
				}
			}
			
			scanf(")");
			
			if (flag) {
				score += list[j].allScore; 
			} else {
				wrongAns[j]++; // 错误统计 
			}
		}
		
		printf("%d\n", score);
		
	}
	
	int maxWrong = 0;
	for (int i = 0; i < M; i++) {
		if(wrongAns[i] > maxWrong) {
            maxWrong = wrongAns[i];
        }
	}
	
	if (maxWrong == 0) {
		printf("Too simple");
	} else {
		printf("%d", maxWrong);
		for (int i = 0; i < M; i++) {
			if(wrongAns[i] == maxWrong) {
                printf(" %d", i + 1);
            }
		}
	}
	return 0;
}
```

## 1059 C语言竞赛 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805269828059136

注意点：注意其中map查询不到的时候的处理方式，以及素数的判断方式。

答案：

```
#include<cstdio>
#include<map>
#include<string>
#include<iostream>
#include<math.h>

using namespace std;

map<string, int> m;

// 获取map的值 
int getRank (string str) {
	map<string, int>::iterator it = m.find(str);
	if (it != m.end()) {
		return it -> second;
	} else {
		return 0; // 没找到 
	}
}

// 是否是素数
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

void check (string str) {
	 
	int res = getRank(str);
	
	if (res == 0) { // 没找到 
		cout << str << ": " << "Are you kidding?" << endl;
	} else if (res == -1) {
		cout << str << ": " << "Checked" << endl;
	} else {
		
		if (res == 1) {
			cout << str << ": " << "Mystery Award" << endl;
		} else if(isPrime(res)) {
			cout << str << ": " << "Minion" << endl;
		} else {
			cout << str << ": " << "Chocolate" << endl;
		}
		
		m[str] = -1;
		
	}
	
}

main () {
	
	int N;
	
	scanf("%d", &N);
	getchar(); // 获取空格 
	string str;
	
	for (int i = 0; i < N; i++) {
		getline(cin, str);
		m[str] = i + 1;
	}
	
	int M;
	
	scanf("%d", &M);
	getchar();
	
	string str2;
	for (int i = 0; i < M; i++) {
		getline(cin, str2);
		
		check(str2);
	} 
	
	return 0;
} 
```

## 1060 爱丁顿数 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805269312159744

注意点：从大到小排序。

答案：

```
#include<cstdio>
#include<algorithm>

using namespace std; 

bool cmp (int a, int b) {
	return a > b;
}

main () {
	
	int n;
	
	int list[100010];
	
	scanf("%d", &n);
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &list[i]);
	}
	
	// 从大到小排列 
	sort(list, list + n, cmp);
	
	int ans = 0;
	
	for (int i = 0; i < n; i++) {
		
		int r = i + 1;
		
		if (list[i] > r) {
			ans = r;
		}
		
	} 
	
	printf("%d", ans);
	 
	return 0;
} 
```

## 1061 判断题 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805268817231872

注意点：

答案：

```
#include<cstdio>

struct node {
	
	int score;
	int flag;
	
};

main () {
	
	int N, M;
	
	scanf("%d %d", &N, &M);
	node list[M];
	
	// 分值 
	for (int i = 0; i < M; i++) {
		scanf("%d", &list[i].score);
	}
	
	// 答案 
	for (int i = 0; i < M; i++) {
		scanf("%d", &list[i].flag);
	}
	
	for (int i = 0; i < N; i++) {
		
		int sum = 0;
		
		for (int j = 0; j < M; j++) {
			
			int s;
			
			scanf("%d", &s);
			
			if (s == list[j].flag) {
				sum += list[j].score;
			}
		}
		printf("%d\n", sum);
		
	}
	
} 
```

## 1062 最简分数 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805268334886912

注意点：求最大公约数，与分数的加减乘除并无关系。

答案：

```
#include <iostream>

using namespace std;

// 最大公约数 
int gcd(int a, int b){
	return b == 0 ? a : gcd(b, a % b);
}

int main() {
	
    int n1, m1, n2, m2, k;
    scanf("%d/%d %d/%d %d", &n1, &m1, &n2, &m2, &k);
    
    // 当n1/m1大于n2/m2 
    if(n1 * m2 > n2 * m1) {
        swap(n1, n2);
        swap(m1, m2);
    }
    
    int num = 1; // 分子 
    
    bool flag = false; // 是否要打印空格 
    
    // 直到num/k > n1/m1
    while(n1 * k >= m1 * num) {
		num++;
	}
	
	// 在n1/m1和n2/m2之间，并且不可再约分的num/k 
    while(n1 * k < m1 * num && m2 * num < n2 * k) {
        if(gcd(num, k) == 1) { // 最简（最大公约数是1） 
            printf("%s%d/%d", flag == true ? " " : "", num, k);
            flag = true; 
        }
        num++;
    }
    
    return 0;
}
```

## 1063 计算谱半径 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805267860930560

注意点：理解题意。

答案：

```
#include<cstdio>
#include<algorithm>
#include<cmath>

using namespace std;

double f (double a, double b){
	return sqrt(( a * a + b * b ));
}

int main () {
	
	int n;
	double a, b, ans = 0;
	
	scanf("%d", &n);
	
	for (int i = 0; i < n; i++) {
		scanf("%lf%lf", &a, &b);
		ans = max(ans, f(a, b));
	}
	
	printf("%.2f\n",ans);
	
	return 0;
}
```

## 1064 朋友数 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805267416334336

注意点：灵活运用hashTable，sort，vector，string。

答案：

```
#include<cstdio>
#include<iostream>
#include<string>
#include<vector>
#include<algorithm>

using namespace std;

main () {
	
	int n;
	scanf("%d", &n);
	
	vector<int> v;
	int list[10010] = { 0 }; // 验证用 
	
	for (int i = 0; i < n; i++) {
		string str;
		cin >> str;
		int sum = 0;
		
		for (int j = 0; j < str.size(); j++) {
			sum += str[j] - '0';
		}
		
		if (list[sum] == 0) {
			v.push_back(sum);
			list[sum] = 1;	
		}
		
	}
	
	printf("%d\n", v.size());
	sort(v.begin(), v.end());
	
	for (int i = 0; i < v.size(); i++) {
		if (i == 0) {
			printf("%d", v[i]);	
		} else {
			printf(" %d", v[i]);
		}
	}
	
	return 0;	
}
```

## 1065 单身狗 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805266942377984

注意点：注意特殊情况00000，所以输出需要%05d，并且数组初始化为-1

答案：

```
#include<cstdio>
#include<vector>
#include<algorithm>
#include<cstring>

using namespace std;

main () {
	
	int n;
	
	vector<int> ori;
	vector<int> ans;
	
	int list1[100000]; // 用于存储couple
	int list2[100000]; // 用于查询
	
	// 全部设为-1，因为00000也是ID 
	memset(list1, -1, sizeof(list1));
	memset(list2, -1, sizeof(list2));
	
	scanf("%d", &n);
	
	for (int i = 0; i < n; i++) {
		int a, b;
		scanf("%d %d", &a, &b);
		list1[a] = b;
		list1[b] = a;
	}
	
	int m;
	
	scanf("%d", &m);
	
	for (int i = 0; i < m; i++) {
		int a;
		scanf("%d", &a);
		list2[a] = 1;
		ori.push_back(a);
	}
	
	for (int i = 0; i < m; i++) {
		
		int a = -1, b = -1, c = -1;
		
		a = ori[i];
		b = list1[a]; // a的对象
		
		if (b == -1) {
			ans.push_back(a);
		} else {
			c = list2[b]; // b是否在list2中 
			
			if (c == -1) {
				ans.push_back(a);
			}
			
		}
		
	}
	
	sort(ans.begin(), ans.end());
	printf("%d\n", ans.size());
	
	for (int i = 0; i < ans.size(); i++) {
		if (i == 0) {
			printf("%05d", ans[i]);	
		} else {
			printf(" %05d", ans[i]);
		}
	}
	
	return 0;	
} 
```

## 1066 图像过滤 （15 分）。

https://pintia.cn/problem-sets/994805260223102976/problems/994805266514558976

答案：

```
#include<cstdio>

main () {
	
	int M, N, A, B, r;
	int arr[510][510];
	
	scanf("%d %d %d %d %d", &M, &N, &A, &B, &r);
	
	for (int i = 0; i < M; i++) {
		for (int j = 0; j < N; j++) {
			int t;		
			scanf("%d", &t);
			if (t >= A && t <= B) {
				arr[i][j] = r;
			} else {
				arr[i][j] = t;
			}	
		}
	}
	
	for (int i = 0; i < M; i++) {
		for (int j = 0; j < N; j++) {
			if (j == 0) {
				printf("%03d", arr[i][j]);	
			} else {
				printf(" %03d", arr[i][j]);
			} 
			if (j == N - 1) {
				printf("\n");
			}
		}
	}
	
	return 0;
} 
```

## 1067 试密码 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805266007048192

注意点：注意格式问题。注意获取行数的方式。

答案：

```
#include<cstdio>
#include<iostream>
#include<string>

using namespace std;

main () {

	string ans;
	int n;
	cin >> ans >> n;
	string str;
	bool flag = true;
	getchar();
	int count = 0;
	
	while (getline(cin, str) && str != "#") {
		
		if (flag) {
			
			if (str == ans) {
				flag = false;
				cout << "Welcome in" << endl;
			} else {
				
				cout << "Wrong password: " << str << endl;
				
				count++;
				
				if (count >= n) {
					flag = false;
					cout << "Account locked" << endl;
				}
				
			}
				
		} else {
			continue;	
		}
	}
	
	return 0;	
} 
```

## 1068 万绿丛中一点红 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805265579229184

注意点：坑点在于审题，注意是要“独一无二”的颜色。

答案：

```
#include<cstdio>
#include<cmath>
#include<map>

using namespace std;

main () {
	
	int M, N, TOL;
	
	map<int, int> vis; // 独一无二 
	
	scanf("%d %d %d", &M, &N, &TOL);
	int arr[N][M];
	
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			scanf("%d", &arr[i][j]);
			vis[arr[i][j]]++;
		}
	}
	
	int count = 0;
	int x, y, color;
	
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			if (vis[arr[i][j]] == 1) {
				int c = arr[i][j];
			
				// 上 
				if (i - 1 >= 0) {
					if (abs(arr[i][j] - arr[i - 1][j]) <= TOL) {
						continue;
					}
				}
				// 右上 
				if (i - 1 >= 0 && j + 1 <= M) {
					if (abs(arr[i][j] - arr[i - 1][j + 1]) <= TOL) {
						continue;
					}
				}
				// 右 
				if (j + 1 <= M) {
					if (abs(arr[i][j] - arr[i][j + 1]) <= TOL) {
						continue;
					}
				}
				// 右下 
				if (i + 1 <= N && j + 1 <= M) {	
					if (abs(arr[i][j] - arr[i + 1][j + 1]) <= TOL) {
						continue;
					}
				}
				// 下 
				if (i + 1 <= N) {
					if (abs(arr[i][j] - arr[i + 1][j]) <= TOL) {
						continue;
					}
				}
				// 左下 
				if (i + 1 <= N && j - 1 >= 0) {
					if (abs(arr[i][j] - arr[i + 1][j - 1]) <= TOL) {
						continue;
					}
				}
				// 左 
				if (j - 1 >= 0) {
					if (abs(arr[i][j] - arr[i][j - 1]) <= TOL) {
						continue;
					}
				}
				// 左上 
				if (j - 1 >= 0 && i - 1 >= 0) {
					if (abs(arr[i][j] - arr[i - 1][j - 1]) <= TOL) {
						continue;
					}
				}
				
				x = i;
				y = j;
				color = arr[i][j];
				
				count++;
			}
			
		}
		
	}
	
	if (count == 0) {
		printf("Not Exist");
	} else if (count == 1) {
		printf("(%d, %d): %d", y + 1, x + 1, color);
	} else {
		printf("Not Unique");
	}
	
	return 0;
} 
```

## 1069 微博转发抽奖 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805265159798784

注意点：这题网上搜的答案可以看出，在一定情况下，没有搜到key的map返回0也是可以作为判断依据的。

答案：

```
#include<cstdio>
#include<iostream>
#include<string>
#include<map>

using namespace std;

map<string, int> m;

int isRepeat (string str) {
	map<string, int>::iterator it = m.find(str);
	if (it != m.end()) {
		return it -> second;
	} else {
		return 0; // 没找到 
	}
}

main () {
	
	int M, N, S;
	
	scanf("%d %d %d", &M, &N, &S);
	getchar();
	int luck = S;
	string str;
	int count = 0;
	
	int r = 0;
	
	for (int i = 1; i <= M; i++) {
		getline(cin, str);
		
		if (luck <= M && i == luck) {
			int res = isRepeat(str);
			if (res == 0) {
				cout << str << endl;
				count++;
				m[str] = 1;
				luck += N;	
			} else {
				luck++;	
			}		
		}
		
	}
	
	if (count == 0) {
		cout << "Keep going..." << endl;
	}
	
	return 0;
} 
```

另外答案

```
#include <iostream>
#include <map>
using namespace std;
int main() {
    int m, n, s;
    scanf("%d%d%d", &m, &n, &s);
    string str;
    map<string, int> mapp;
    bool flag = false;
    for (int i = 1; i <= m; i++) {
        cin >> str;
        if (mapp[str] == 1) s = s + 1;
        if (i == s && mapp[str] == 0) {
            mapp[str] = 1;
            cout << str << endl;
            flag = true;
            s = s + n;
        }
    }
    if (flag == false) cout << "Keep going...";
    return 0;
}
```

## 1070 结绳 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805264706813952

注意点：越长的绳子对折的次数应该要越少，最后才会最长。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {
	
    int n;
    scanf("%d", &n);
    
    vector<int> v(n);
    
    for (int i = 0; i < n; i++) {
    	scanf("%d", &v[i]);
	}
	
    sort(v.begin(), v.end());
    
    int result = v[0];
    
    for (int i = 1; i < n; i++) {
    	result = (result + v[i]) / 2;
	}
	
    printf("%d", result);
    return 0;
}
```

## 1071 小赌怡情 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805264312549376

注意点：注意格式，total前面是两个空格。

答案：

```
#include<cstdio>

using namespace std;

main () {
	
	int T, K; // 赠送筹码，游戏次数
	
	int chip;
	scanf("%d %d", &T, &K);
	chip = T;
	
	for (int i = 0; i < K; i++) {
		
		int n1, b, t, n2;
		
		int res;
		scanf("%d %d %d %d", &n1, &b, &t, &n2);
		
		if (chip == 0) {
			printf("Game Over.\n");
			break;
		}
		if (t > chip) {
			printf("Not enough tokens.  Total = %d.\n", chip);
			continue;
		}
		
		if (n2 > n1) {
			res = 1;
		} else if (n2 < n1){
			res = 0;
		}
		
		if ( res == b ) {
			chip += t;
			printf("Win %d!  Total = %d.\n", t, chip);
		} else {
			chip -= t;
			printf("Lose %d.  Total = %d.\n", t, chip);
		}	
	}
	
	return 0;
} 
```

## 1072 开学寄语 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805263964422144

注意点：注意格式问题，其中四位数字需要尤其注意， %04d。

答案：

```
#include<cstdio>
#include<vector>

using namespace std;

main () {
	
	int N, M; // 学生人数，需要被查缴的物品编号 
	
	char name[5];
	int arr[10000] = { 0 };
	scanf("%d %d", &N, &M);
	int nameCount = 0, itemCount = 0;
	
	for (int i = 0; i < M; i++) {
		int n;
		scanf("%d", &n);
		arr[n] = 1;
	}
	
	for (int i = 0; i < N; i++) {
		
		int tempN;
		vector<int> v; // 存储当前被缴获的
		bool flag = false; 
		
		scanf("%s %d", name, &tempN);
		for (int j = 0; j < tempN; j++) {
			int k;
			scanf("%d", &k);
			if (arr[k] == 1) {
				v.push_back(k);
			}
		}
		
		if (v.size() != 0) {
			nameCount++;
			itemCount += v.size();
			printf("%s:", name);
			for (int h = 0; h < v.size(); h++) {
				printf(" %04d", v[h]);
			}
			printf("\n");
			
		}
		
	}
	
	printf("%d %d", nameCount, itemCount);
	return 0;
}
```

## 1073 多选题常见计分法 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805263624683520

注意点：可以与B1058联动，我这里采用网上 “柳婼” 的做法。

答案：

```
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;
int main() {
    int n, m, optnum, truenum, temp, maxcnt = 0;
    int hash[] = {1, 2, 4, 8, 16}, opt[1010][110] = {0};
    char c;
    scanf("%d %d", &n, &m);
    vector<int> fullscore(m), trueopt(m);
    vector<vector<int> > cnt(m, vector<int>(5));
    for (int i = 0; i < m; i++) {
        scanf("%d %d %d", &fullscore[i], &optnum, &truenum);
        for (int j = 0; j < truenum; j++) {
            scanf(" %c", &c);
            trueopt[i] += hash[c-'a'];
        }
    }
    for (int i = 0; i < n; i++) {
        double grade = 0;
        for (int j = 0; j < m; j++) {
            getchar();
            scanf("(%d", &temp);
            for (int k = 0; k < temp; k++) {
                scanf(" %c)", &c);
                opt[i][j] += hash[c-'a'];
            }
            int el = opt[i][j] ^ trueopt[j];
            if (el) {
                if ((opt[i][j] | trueopt[j]) == trueopt[j]) {
                    grade += fullscore[j] * 1.0 / 2;
                }
                if (el) {
                    for (int k = 0; k < 5; k++)
                        if (el & hash[k]) cnt[j][k]++;
                }
            } else {
                grade += fullscore[j];
            }
        }
        printf("%.1f\n", grade);
    }
    for (int i = 0; i < m; i++)
        for (int j = 0; j < 5; j++)
            maxcnt = maxcnt > cnt[i][j] ? maxcnt : cnt[i][j];
    
    if (maxcnt == 0) {
        printf("Too simple\n");
    } else {
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < cnt[i].size(); j++) {
                if (maxcnt == cnt[i][j])
                    printf("%d %d-%c\n", maxcnt, i+1, 'a'+j);
            }
        }
    }
    return 0;
}
```

## 1074 宇宙无敌加法器 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805263297527808

注意点：注意这里补零的方式，并且理解为什么最后一个进位一定是1。

答案：

```
#include <iostream>

using namespace std;

int main() {
	
	string s, s1, s2, ans; // 进制表，第一个数，第二个数，答案 
	
	int carry = 0, flag = 0; // 进位，结果是否为0
	
	cin >> s >> s1 >> s2;
	
	ans = s;
	
	// 将s1和s2变的与s一样长, 前面都是'0' 
	string ss1(s.length() - s1.length(), '0');
	s1 = ss1 + s1;
	string ss2(s.length() - s2.length(), '0');
	s2 = ss2 + s2;
	
	for(int i = s.length() - 1; i >= 0; i--) {
		
        int mod = s[i] == '0' ? 10 : (s[i] - '0'); // 进制 
        
        ans[i] = (s1[i] - '0' + s2[i] - '0' + carry) % mod + '0'; // 当前位 
        
        carry = (s1[i] - '0' + s2[i] - '0' + carry) / mod; // 进位，进位永远都是1 
		
    }
    
    if (carry != 0) ans = '1' + ans;
    
    for(int i = 0; i < ans.size(); i++) {
        if (ans[i] != '0' || flag == 1) {
            flag = 1;
            cout << ans[i];
        }
    }
    if (flag == 0) cout << 0;
    return 0;
}
```


## 1075 链表元素分类 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805262953594880

注意点：将数据分为3类，最后输出的时候有技巧。

答案：

```
#include <iostream>
#include <vector>

using namespace std;

struct node {
    int data, next;
}list[100000];

vector<int> v[3];

int main() {
	
    int start, n, k, a;
    
    scanf("%d%d%d", &start, &n, &k); // 第一个结点地址，结点总个数，以及正整数K 
    
    for (int i = 0; i < n; i++) {
        scanf("%d", &a); // 结点地址作为下标 
        scanf("%d%d", &list[a].data, &list[a].next);
    }
    
    int p = start;
    
    // 分为三类 
    while(p != -1) {
		 
        int data = list[p].data;
        
        if (data < 0) { // 小于0的为一类 
        	v[0].push_back(p);
		}
		else if (data >= 0 && data <= k) { // [0, k]为一类 
			v[1].push_back(p);
		}
        else { // 大于k为一类 
        	v[2].push_back(p);
		}
        p = list[p].next;
    }
    
    int flag = 0;
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < v[i].size(); j++) {
            if (flag == 0) {
                printf("%05d %d ", v[i][j], list[v[i][j]].data); // 第一次，输出当前结点 
                flag = 1;
            } else {
                printf("%05d\n%05d %d ", v[i][j], v[i][j], list[v[i][j]].data); // 输出上一个结点的next，也就是当前结点v[i][j]。接着输出下一个结点。  
            }
        }
    }
    
    printf("-1"); // 最后一个结点的next 
    
    return 0;
}
```

## 1076 Wifi密码 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805262622244864

答案：

```
#include<cstdio>
#include<string>
#include<iostream>

using namespace std;

main () {
	int n;
	
	scanf("%d", &n);
	
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < 4; j++) {
			string str;
			char a, b;
			cin >> str;
			a = str[0];
			b = str[2];
			if (b == 'T') {
				if (a == 'A') {
					printf("1");	
				}
				if (a == 'B') {
					printf("2");
				}
				if (a == 'C') {
					printf("3");
				}
				if (a == 'D') {
					printf("4");
				}
			}	
		}
	}
	
	return 0;
} 
```

## 1077 互评成绩计算 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805262303477760

注意点：注意其四舍五入的方式。

答案：

```
#include <iostream>

using namespace std;

int main() {
	
    int n, m;
    
    cin >> n >> m; // 分组数与满分 
    
    for (int i = 0; i < n; i++) {
    	
        int g2, g1 = 0, cnt = -2, temp, maxn = -1, minn = m + 1; // cnt去除最高分与最低分 
        
        cin >> g2;
        
        for (int j = 0; j < n-1; j++) {
            cin >> temp;
            if (temp >= 0 && temp <= m) {
                if (temp > maxn) maxn = temp;
                if (temp < minn) minn = temp;
                g1 += temp;
                cnt++;
            }
        }
        
        cout << int((((g1 - minn - maxn) * 1.0 / cnt) + g2) / 2 + 0.5) << endl;
    }
    return 0;
}
```

## 1078 字符串压缩与解压 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805262018265088

注意点：dev-c++ 工具-编译选项-编译器-编译 -std=c++11，stoi的用法。

答案：

```
#include<iostream>

using namespace std;

int main() {
	
    char t;
    cin >> t;
    
    getchar();
    string s, num;
    getline(cin, s);
    
    int cnt = 1;
    
    if (t == 'D') { // 解压
        for (int i = 0; i < s.length(); i++) {
            if (s[i] >= '0' && s[i] <= '9') {
                num += s[i];
            } else {
                if (num.length() > 0) cnt = stoi(num); // string num 转化为 int cnt 
                while(cnt--) cout << s[i];
                cnt = 1;
                num = "";
            }
        }
    } else if (t == 'C') { // 压缩
        char pre = s[0]; // 前一个 
        for (int i = 1; i < s.length(); i++) {
            if (s[i] == pre) { // 是否等于前一个 
                cnt++;
            } else {
                if (cnt >= 2) cout << cnt;
                cout << pre;
                cnt = 1;
                pre = s[i];
            }
        }
        // 结尾扫描存储下来的cnt和pre，记得输出 
        if (cnt >= 2) cout << cnt;
        cout << pre;
    }
    return 0;
}
```

## 1079 延迟的回文数 （20 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805261754023936

注意点：重点在于其中的相加，需要使用大整数相加的想法。

答案：

```
#include <iostream>
#include <algorithm>
#include<string>

using namespace std;

// 与大整数相加类似 
string add(string a) {
    string b = a, ans;
    reverse(b.begin(), b.end());
    int len = a.length(), carry = 0;
    for (int i = 0; i < len; i++) {
        int num = (a[i] - '0' + b[i] - '0') + carry;
        carry = 0;
        if (num >= 10) {
            carry = 1;
            num = num - 10;
        }
        ans += char(num + '0');
    }
    if(carry == 1) ans += '1';
    reverse(ans.begin(), ans.end());
    return ans;
}

int main() {
    string s;
    cin >> s;
    
    int cnt = 0;
    while (cnt < 10) {
    	
        string t = s;
        reverse(t.begin(), t.end()); // 将s翻转 
        
        if (t == s) {
            cout << s << " is a palindromic number.";
            break;
        } else {
            cout << s << " + " << t << " = " << add(s) << endl;
            s = add(s);
            cnt++;
        }
        
    }
    
    if (cnt == 10) cout << "Not found in 10 iterations.";
    return 0;
}
```

## 1080 MOOC期终成绩 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805261493977088

注意点：

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>
#include <map>

using namespace std;

struct node {
    string name;
    int gp, gm, gf, g; // 在线编程成绩，期中考试成绩，期末考试成绩，总评 
};

bool cmp(node a, node b) {
    return a.g != b.g ? a.g > b.g : a.name < b.name; // 总分递减，总分相同则姓名递增 
}

map<string, int> idx; // 名字与在v中顺序的对应关系 

int main() {
	
    int p, m, n, score, cnt = 1;
    cin >> p >> m >> n; // P（做了在线编程作业的学生数）、M（参加了期中考试的学生数）、N（参加了期末考试的学生数）
    
    vector<node> v, ans;
    string s;
    
	// p个在线编程成绩 
    for (int i = 0; i < p; i++) {
        cin >> s >> score;
        if (score >= 200) {
            v.push_back(node{s, score, -1, -1, 0}); // struct顺序初始化方式
            idx[s] = cnt++;
        }
    }
    // m个期中考试成绩 
    for (int i = 0; i < m; i++) {
        cin >> s >> score;
        if (idx[s] != 0) v[idx[s] - 1].gm = score;
    }
    // n个期末考试成绩 
    for (int i = 0; i < n; i++) {
        cin >> s >> score;
        if (idx[s] != 0) {
            int temp = idx[s] - 1;
            v[temp].gf = v[temp].g = score;
            if (v[temp].gm > v[temp].gf) v[temp].g = int(v[temp].gm * 0.4 + v[temp].gf * 0.6 + 0.5); // 计算总评 
        }
    }
    
    // 总评超过60的即为答案 
    for (int i = 0; i < v.size(); i++) {
    	if (v[i].g >= 60) ans.push_back(v[i]);
	}
    // 按照cmp规则排序 
    sort(ans.begin(), ans.end(), cmp);
    // 输出 
    for (int i = 0; i < ans.size(); i++) {
    	printf("%s %d %d %d %d\n", ans[i].name.c_str(), ans[i].gp, ans[i].gm, ans[i].gf, ans[i].g);
	}
        
    return 0;
}
```

## 1081 检查密码 （15 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805261217153024

注意点：一定要注意当需要一整行的时候，一行有可能出现空格的情况，需要使用getline，而使用getline，需要注意开头空格的情况。

答案：

```
#include<cstdio>
#include<iostream>
#include<string>

using namespace std;

string check (string str) {
	string ans;
	bool a = false, b = false, c = false; // 字母，数字，其他 
	// 太短 
	if (str.size() < 6) {
		ans = "Your password is tai duan le.";
		return ans;
	}
	for (int i = 0; i < str.size(); i++) {
		
		if (str[i] >= 'a' && str[i] <= 'z' || str[i] >= 'A' && str[i] <= 'Z') { // 字母 
			a = true; 
		}
		else if (str[i] >= '0' && str[i] <= '9') { // 数字 
			b = true; 
		}
		else if (str[i] == '.') { // 小数点 
			
		} else { // 其他 
			c = true;
		}
	}
	if (c) {
		ans = "Your password is tai luan le.";
	}
	if (!b && a) {
		ans = "Your password needs shu zi.";
	} 
	if (!a && b) {
		ans = "Your password needs zi mu.";
	}
	if (!c && b && a) {
		ans = "Your password is wan mei.";
	}
	return ans;
}

main () {
	
	int n;
	scanf("%d", &n); 
	
	getchar(); // 空格 
	for (int i = 0; i < n; i++) {
		string str;
		getline(cin, str);
		string ans = check(str);
		cout << ans << endl;
	}
	
	return 0; 
} 
```

## 1082 射击比赛 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805260990660608

注意点：只需要平方和就可以了。

答案：

```
#include <iostream>

using namespace std;

int main() {
	
    int n, id, x, y, maxid, maxdis = -1, minid, mindis = 99999;
    
    cin >> n;
    
    for (int i = 0; i < n; i++) {
    	
        cin >> id >> x >> y;
        
        int dis = x * x + y * y;
        
        if (dis > maxdis) maxid = id;
        if (dis < mindis) minid = id;
        
        maxdis = max(maxdis, dis);
        mindis = min(mindis, dis);
        
    }
    printf("%04d %04d", minid, maxid);
    return 0;
}
```

## 1083 是否存在相等的差 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805260780945408

答案：

```
#include <iostream>

using namespace std;

int main() {
	
    int n, t, a[10000] = { 0 };
    
    cin >> n;
    for (int i = 1; i <= n; i++) {
    	
        cin >> t;
        
        a[abs(t-i)]++;
        
    }
    for (int i = 9999; i >= 0; i--) {
		if (a[i] >= 2) cout << i << " " << a[i] << endl;
	}
	
    return 0;
}
```

## 1084 外观数列 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/994805260583813120

注意点：to_string的用法，for的别样用法。

答案：

```
#include <iostream>

using namespace std;

int main() {
    string s;
    int n, j;
    
    cin >> s >> n; // 求s的第n项 
    
    for (int cnt = 1; cnt < n; cnt++) {
    	
        string t;
        
        for (int i = 0; i < s.length(); i = j) {
        	
        	// 从i开始到j为相同的s[i] 
            for (j = i; j < s.length() && s[j] == s[i]; j++);
            
            t += s[i] + to_string(j - i);
            
        }
        
        s = t; // 当前的s 
    }
    
    cout << s;
    return 0;
}
```

## 1085 PAT单位排行 （25 分）***

https://pintia.cn/problem-sets/994805260223102976/problems/994805260353126400

注意点：cctype其中一些处理字符串的函数。还有一个很重要的，就是遍历map的方式。

答案：

```
#include <iostream>
#include <algorithm>
#include <cctype>
#include <vector>
#include <map>

using namespace std;

struct node {
    string school; // 学校 
    int tws, ns; // 加权总分，考生人数 
};

//学校首先按加权总分排行。如有并列，则应对应相同的排名，并按考生人数升序输出。如果仍然并列，则按单位码的字典序输出 
bool cmp(node a, node b) {
    if (a.tws != b.tws) {
		return a.tws > b.tws;
	}
    else if (a.ns != b.ns) {
		return a.ns < b.ns;
	} 
    else {
		return a.school < b.school;
	}
}

int main() {
    int n;
    scanf("%d", &n); // 考生总人数 
    
    // 学校作为key 
    map<string, int> cnt; // 学校人数 
    map<string, double> sum; // 学校分数 
    
    for (int i = 0; i < n; i++) {
    	
        string id, school; // 准考证，学校
		
		// 输入准考证，分数，学校 
        cin >> id;
        double score;
        scanf("%lf", &score);
        cin >> school;
        
        // 学校转化为小写
        for (int j = 0; j < school.length(); j++) {
			school[j] = tolower(school[j]);
		} 
        
        // 顶级与乙级的分数的处理 
        if (id[0] == 'B') {
			score = score / 1.5;
		} 
        else if (id[0] == 'T') {
			score = score * 1.5;
		}
            
        sum[school] += score;
        cnt[school]++;
    }
    
    vector<node> ans;
    // 遍历学校
    for (auto it = cnt.begin(); it != cnt.end(); it++) {
    	node temp = node{it->first, (int)sum[it->first], cnt[it->first]}; // 学校，加权总分，考生人数 
    	ans.push_back(temp);
	}
	
	// 按规则学校排序 
    sort(ans.begin(), ans.end(), cmp);
    
    // 输出答案 
    int rank = 0, pres = -1;
    printf("%d\n", (int)ans.size()); // 学校总数 
    for (int i = 0; i < ans.size(); i++) {
        // 如果当前分数与前一个不同，即排名增加，否则排名与前一位相同的保持一致 
		if (pres != ans[i].tws) {
        	rank = i + 1;	
		}
        pres = ans[i].tws;
        printf("%d ", rank); // 排名 
        cout << ans[i].school; // 学校名 
        printf(" %d %d\n", ans[i].tws, ans[i].ns); // 加权总分，考生人数 
    }
    return 0;
}
```

## 1086 就不告诉你 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1038429065476579328

注意点：善于利用to_string，reverse等。

答案：

```
#include<cstdio>
#include<iostream>
#include<string>

using namespace std;

main () {
	
	int a, b, c;
	
	scanf("%d %d", &a, &b);
	
	c = a * b;
	
	string d = to_string(c);
	
	bool flag = false; // 数字最高位不能为0 
	for (int i = d.size() - 1; i >= 0; i--) {
		if (d[i] != '0' || flag) {
			flag = true;
			cout << d[i];	
		}	
	}
	
	return 0;	
}
```

## 1087 有多少不同的值 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1038429191091781632

注意点：利用map或者set不重复的特点。

答案：

```
#include <iostream>
#include <set>
using namespace std;
int main() {
    int n;
    scanf("%d", &n);
    set<int> s;
    for (int i = 1; i <= n; i++)
        s.insert(i / 2 + i / 3 + i / 5);
    printf("%d", s.size());
    return 0;
}
```

```
#include<map>
#include<iostream>

using namespace std;

int main()
{
    int n;
    map<int, int> mp;
    cin >> n;
    for(int i = 1; i <= n; i++){
        mp[i / 2 + i / 3 + i / 5] ++;
    }
    cout << mp.size() << endl;
    return 0;
}
```

## 1088 三人行 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1038429286185074688

注意点：理解题意，丙不一定是整数。

答案：

```
#include <iostream>
#include <cmath>

using namespace std;

int m, x, y;

// 输出 
void print(double t) {
    if (m == t) printf(" Ping");
    else if (m < t) printf(" Cong");
    else printf(" Gai");
}

int main() {
	
    scanf("%d %d %d", &m, &x, &y);
    
    // i为甲，为两位数 
    for (int i = 99; i >= 10; i--) {
        int j = i % 10 * 10 + i / 10; // j为乙 
        double k = abs(j - i) * 1.0 / x; // k为丙，不一定是整数。 
        if (j == k * y) { // 乙的能力值是丙的y倍 
            cout << i; // 输出甲 
            print(i); print(j); print(k); // 与自己做对比 
            return 0;
        }
    }
    cout << "No Solution";
    return 0;
}
```

## 1089 狼人杀-简单版 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1038429385296453632

注意点：https://blog.csdn.net/liuchuo/article/details/82560831

答案：

```
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> v(n+1);
    for (int i = 1; i <= n; i++) cin >> v[i];
    for (int i = 1; i <= n; i++) {
        for (int j = i + 1; j <= n; j++) {
            vector<int> lie, a(n + 1, 1);
            a[i] = a[j] = -1;
            for (int k = 1; k <= n; k++)
                if (v[k] * a[abs(v[k])] < 0) lie.push_back(k);
            if (lie.size() == 2 && a[lie[0]] + a[lie[1]] == 0) {
                cout << i << " " << j;
                return 0;
            }
        }
    }
    cout << "No Solution";
    return 0;
}
```

## 1090 危险品装箱 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1038429484026175488

注意点：https://blog.csdn.net/liuchuo/article/details/82560808

答案：

```
#include <iostream>
#include <vector>
#include <map>
using namespace std;
int main() {
    int n, k, t1, t2;
    map<int,vector<int>> m;
    scanf("%d%d", &n, &k);
    for (int i = 0; i < n; i++) {
        scanf("%d%d", &t1, &t2);
        m[t1].push_back(t2);
        m[t2].push_back(t1);
    }
    while (k--) {
        int cnt, flag = 0, a[100000] = {0};
        scanf("%d", &cnt);
        vector<int> v(cnt);
        for (int i = 0; i < cnt; i++) {
            scanf("%d", &v[i]);
            a[v[i]] = 1;
        }
        for (int i = 0; i < v.size(); i++)
            for (int j = 0; j < m[v[i]].size(); j++)
                if (a[m[v[i]][j]] == 1) flag = 1;
        printf("%s\n",flag ? "No" :"Yes");
    }
    return 0;
}
```


## 1091 N-自守数 （15 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1071785664454127616

注意点：注意to_string与substr的运用。

答案：

```
#include <iostream>
#include <string>

using namespace std;

int main() {
	
    int m;
    cin >> m;
    
    while (m--) {
        int k, flag = 0;
        cin >> k;
        
        for (int n = 1; n < 10; n++) {
            int mul = n * k * k;
            string smul = to_string(mul), sk = to_string(k);
            string smulend = smul.substr(smul.length() - sk.length());
            if (smulend == sk) {
                printf("%d %d\n", n, mul);
                flag = 1;
                break;
            }
        }
        if (flag == 0) printf("No\n");
    }
    return 0;
} 
```

## 1092 最好吃的月饼 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1071785779399028736

注意点：

答案：

```
#include <iostream>
#include <vector>

using namespace std;

int sum[1005];

int main() {
    int m, n, maxn = 0, total = 0;
    vector<int> ans;
    
    cin >> m >> n; // 月饼种类，城市数量 
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
        	int a; 
            cin >> a;
            sum[j] += a; // 记录第j种月饼的数量 
            maxn = max(maxn, sum[j]);
        }
    }
    
    cout << maxn << endl; // 最大销量 
    
    // 最大销量并列的情况 
    for (int i = 1; i <= m; i++) {
		if (sum[i] == maxn) ans.push_back(i);
	}
	// 递增顺序输出并列冠军 
    for (int i = 0; i < ans.size(); i++) {
        if (i != 0) cout << " ";
        cout << ans[i];
    }
    return 0;
}
```

## 1093 字符串A+B （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1071785884776722432

注意点：hashTable思想，已经输出过的字符串不输出即可。

答案：

```
#include <iostream>

using namespace std;

int main() {
    string s1, s2, s;
    int hash[200] = {0};
    
    getline(cin, s1);
    getline(cin, s2);
    s = s1 + s2;
    
    for (int i = 0; i < s.size(); i++) {
        if (hash[s[i]] == 0) cout << s[i]; // 没有输出过的才输出 
        hash[s[i]] = 1;
    }
    return 0;
}
```

## 1094 谷歌的招聘 （20 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1071785997033074688

注意点：擅长应用substr，stoi，以及考察素数。

答案：

```
#include<iostream>
#include<string>
#include<cmath>

using namespace std;

bool isPrime (int a) {
	if (a <= 1) {
		return false;
	}
	int sqr = (int)sqrt(1.0 * a);
	for (int i = 2; i <= sqr; i++) {
		if (a % i == 0) {
			return false;
		}
	}
	return true;
}

int main () {
	int L, K;
    string str;
    cin >> L >> K >> str;
	for (int i = 0; i <= L - K; i++) {
		string s = str.substr(i, K);
		int num = stoi(s);
		if (isPrime(num)) {
			cout << s;
			return 0;
		}
	}
	cout << "404\n";
	return 0;
}
```

## 1095 解码PAT准考证 （25 分）

https://pintia.cn/problem-sets/994805260223102976/problems/1071786104348536832

注意点：https://blog.csdn.net/liuchuo/article/details/84972869

答案：

```
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;
struct node {
    string t;
    int value;
};
bool cmp(const node &a, const node &b) {
    return a.value != b.value ? a.value > b.value : a.t < b.t;
}
int main() {
    int n, k, num;
    string s;
    cin >> n >> k;
    vector<node> v(n);
    for (int i = 0; i < n; i++)
        cin >> v[i].t >> v[i].value;
    for (int i = 1; i <= k; i++) {
        cin >> num >> s;
        printf("Case %d: %d %s\n", i, num, s.c_str());
        vector<node> ans;
        int cnt = 0, sum = 0;
        if (num == 1) {
            for (int j = 0; j < n; j++)
                if (v[j].t[0] == s[0]) ans.push_back(v[j]);
        } else if (num == 2) {
            for (int j = 0; j < n; j++) {
                if (v[j].t.substr(1, 3) == s) {
                    cnt++;
                    sum += v[j].value;
                }
            }
            if (cnt != 0) printf("%d %d\n", cnt, sum);
        } else if (num == 3) {
            unordered_map<string, int> m;
            for (int j = 0; j < n; j++)
                if (v[j].t.substr(4, 6) == s) m[v[j].t.substr(1, 3)]++;
            for (auto it : m) ans.push_back({it.first, it.second});
        }
        sort(ans.begin(), ans.end(),cmp);
        for (int j = 0; j < ans.size(); j++) printf("%s %d\n", ans[j].t.c_str(), ans[j].value);
        if (((num == 1 || num == 3) && ans.size() == 0) || (num == 2 && cnt == 0)) printf("NA\n");
    }
    return 0;
}
```





# 分类与总结

## 分类与题目的对应

分类与题目的对应并不是一对一的关系，而是多对多的关系。分类表示可以用到某种特定的技巧，或者这题能归类到某种有规律的类型。

## 简单模拟

特点：直接依据题意处理。

* 1001
* 1006
* 1031
* 1041
* 1046
* 1051：数学问题
* 1061
* 1066
* 1071
* 1076
* 1077
* 1081
* 1082
* 1091
* 1092

## 暂未定义类型

特点：暂时无法归类到某种特殊的类型。

* 1003: 找规律
* 1008: 找规律
* 1010: 当没有给n的时候，使用EOF判断是否到结尾
* 1011: 数字范围的判断，int 2^31 10^9，long long 2^63 10^18
* 1012
* 1014: 字符串处理
* 1018
* 1020：找规律
* 1023：找规律，最高位打印除0以外最小的，其余的顺序从小到大按数量打印
* 1024：处理字符串
* 1028
* 1029：字符串处理
* 1048：字符串处理
* 1049：数学问题
* 1050：找规律
* 1052：字符串处理
* 1053
* 1055
* 1056
* 1058
* 1060
* 1063
* 1067
* 1070：找规律
* 1073
* 1088
* 1089
* 1090
* 1095


## 字符与数字的相互转化

特点：字符转化为数字的方法有

字符串转数字

1. 确定是数字字符的，比如'9'，'8'等，直接减去字符'0'，ASCII的相差即为所求的数字。
2. 使用stoi，把string类型的转化为数字。 （dev-c++ 工具-编译选项-编译器-编译 -std=c++11，stoi的用法）
3. `sscanf(str,”%d”,&a);`,  将str（char[]）赋给a（int）

数字转字符串

4. 数字转化为字符串：使用标准库函数to_string()。
5. 数字转化为字符串：使用`sprintf(str,”%d”,a);`,这意味着将a（int）赋给str（char[]）

* 1002
* 1016
* 1018
* 1078
* 1084
* 1086

## 排序

特点：排序算法sort的使用，能够理解并手写一些排序算法，
比如，
（从小到大排序）
冒泡排序，（交换）（进行n-1趟，每趟n - 1 - i次交换，每趟把最大的交换到最后）
选择排序，（交换）（进行n趟，每趟把最小的换到最前）（想法与冒泡类似）
插入排序，（后移）（进行n-1趟，每趟把加入的数，换到合适的位置）
归并排序，（分治，合并）两两分组，之后重复合并。（非递归写法）
快速排序。

添加：字符串比较strcmp()

* 1004
* 1015：考察sort中cmp函数的编写，以及vector排序的方式
* 1035：插入与归并，需要大部分的排序算法与实现

## hashTable思想

特点：hashTable的理解与使用。
1. 当key是int的时候可以用范围合适的数组作为hashTable，记得数组的初始化可以用`{ 0 }`全部初始化为0，当不初始化为0的情况，也可以使用`memset(a, -1, sizeof(a));`，也可以使用`fill(a, a + i, -1)`。
2. 当key是字符串的时候，应该使用map，注意map的遍历方式，以及map查询不到的情况的处理，当value为int的时候，可以将返回为0作为未查询到。

* 1005
* 1032
* 1033
* 1038
* 1039
* 1042
* 1043
* 1047
* 1059
* 1064:包括vector的排序
* 1065
* 1068
* 1069
* 1072
* 1080
* 1083
* 1085：***这题方法记下，关注map的遍历方式：`auto it = cnt.begin(); it != cnt.end(); it++`。auto类似于js的var，自动推导其类型。
* 1087
* 1093

## 素数

特点：牢记素数判断的函数，性能比较好的用sqrt开平方的那种。

* 1007
* 1013
* 1059
* 1094

## 大整数运算

特点：大整数的存储方式，大整数的加减乘除

* 1017
* 1021
* 1079

## 分数的四则运算

特点：特意背下。

* 1034

## 进制转化

特点：
1. P进制转化为10进制：多项式累加
2. 除基取余法：除以进制，留下余数，得到的商再除以进制。

* 1022
* 1057
* 1074

## 链表

特点：难，单独处理

* 1025（未完成）
* 1075

## 单位转化

特点：比如日期转化之类的

* 1026
* 1037
* 1044

## 图形输出

特点：找到规律，注意格式

* 1027
* 1036

## 二分查找与two pointer

* 1030：完美数列

## 左右两边问题

特点：属于同一种题，体会思想

* 1040：找规律
* 1045：找规律

## sscanf与sprintf

特点：字符与其他格式做转化，可以利用不符合的情况下不赋值这一特性。

* 1054

## 最大公约数与最小公倍数

特点：辗转相除法

* 1062

## stack

特点：需要倒序输出可以尝试用stack

* 1009

## math与algorithm

algorithm

```
max(),min(),abs(),

swap(a, b),reverse(a, a + i),

fill(a, a + i, -1),sort(a, a + i, cmp),

lower_bound(a, a + i, -1), upper_bound(a, a + i, -1)
```

math

```
fabs(double x), floor(double x), ceil(double x),

pow(double r, double p), sqrt(double x), log(double x),

sin(double x), cos(double x), tan(double x)

asin(), acos(), atan(),

double r = round(double x)
```













