---
layout: post
title: "PAT甲级官方例题练习"
subtitle: "PAT Practice"
date: 2019-7-9
author: HouXingYi
category: PAT
tags: PAT
finished: true
---

## 前置条件

甲级考试的分数分布一般为：20、25、25、30；乙考试的分数分布一般为：15、20、20、20、25。

考试时间：2019年9月8日星期日下午1点30分 (北京时间)。 

考试地点：福州大学新区数计学院5号楼。

考试环境：福州大学： 张栋, zhangdong@fzu.edu.cn
Dev C++ 5.10；Code::Blocks 16.01；Java SE Development Kit 9.0.1；Eclipse Oxygen.2 4.7.2；Python解释器（3.6.5）；PyCharm Community Edition

PAT练习题列表地址（甲级）：https://pintia.cn/problem-sets/994805342720868352/problems/type/7

开发工具：Dev-C++ 5.11（尽量与考场接近）

参考用书：《算法笔记》 机械工业出版社

## 注意

1. C/C++的主函数必须定义为整型，即“int main()”; 程序正常结束必须返回0，即“return 0;”否则将会得到返回非零错误。

## 柳神，码云

https://gitee.com/branches/PAT

## 1001 A+B Format (20 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805528788582400

翻译：计算 a + b 并以标准格式输出和，格式为数字必须每三个用逗号隔开（除非四位数以下）

思路：将数字转化为字符串处理（to_string）。之后处理字符串即可。

答案：

柳神写的：

```
#include <iostream>

using namespace std;

int main() {
	
    int a, b;
    
    cin >> a >> b;
    
    string s = to_string(a + b); // 将数值转化为字符串，会保留负号 
    
    int len = s.length();
    
    for (int i = 0; i < len; i++) {
        cout << s[i];
        if (s[i] == '-') {
			continue;
		}
		// 当前位的下标i满足(i + 1) % 3 == len % 3并且i不是最后一位 
        if ((i + 1) % 3 == len % 3 && i != len - 1) {
			cout << ",";
		}
    }
    return 0;
}
```

自己写的：

```
#include <cstdio>
#include <iostream>

using namespace std;

int main () {
	
	int a, b;
	
	scanf("%d %d", &a, &b);
	
	string s = to_string(a + b);
	
	int len = s.length();
	
	for (int i = 0; i < len; i++) {
		
		char t = s[i];
		
		cout << t;
		
		if (t == '-') {
			continue;
		}
		
		// 当前位的下标i满足(i + 1) % 3 == len % 3并且i不是最后一位 
        if ((i + 1) % 3 == len % 3 && i != len - 1) {
			cout << ",";
		}	
		
	}
	
	
	return 0;
} 
```

## 1002 A+B for Polynomials (25 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805526272000000

翻译：polynomials（多项式）。将A与B两个多项式相加，K为非零项的个数，Ni为指数，Ani为系数。

思路：引入c数组，key为指数，value为系数。多项式加法为，指数相同的系数相加。

答案：

柳神：
```
#include <iostream>
using namespace std;
int main() {
	
    float c[1001] = { 0 }; // 数组长度为1001，全部置零 
    
    int m, n, t;
    float num;
    
    // 第一个多项式 
    scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        scanf("%d%f", &t, &num); // 指数，系数
        c[t] += num; // 指数相等的，系数相加 
    }
    
    // 第二个多项式
    scanf("%d", &n);
   	for (int i = 0; i < n; i++) {
        scanf("%d%f", &t, &num);
        c[t] += num;
    }
    
    int cnt = 0;
    for (int i = 0; i < 1001; i++) {
        if (c[i] != 0) cnt++;
    }
    // 项数 
    printf("%d", cnt);
    for (int i = 1000; i >= 0; i--) {
        if (c[i] != 0.0)
            printf(" %d %.1f", i, c[i]); // 依次输出非零的项 
    }
    return 0;
}
```


自己写的：
```
#include <cstdio>

using namespace std;

int main () {
	
	float p[1001] = { 0 }; // key为次数，value为系数 
	int m, n;
	
	int k; // 次数
	float v; // 系数 
	
	scanf("%d", &m);
	for (int i = 0; i < m; i++) {
		scanf("%d%f", &k, &v);
		p[k] += v;
	}
	
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		scanf("%d%f", &k, &v);
		p[k] += v;
	}
	
	int count = 0;
	for (int i = 0; i < 1001; i++) {
		if (p[i] != 0.0) {
			count++;
		}
	}
	
	printf("%d", count);
	for (int i = 1000; i >= 0; i--) {
		if (p[i] != 0.0) {
			printf(" %d", i);
			printf(" %.1f", p[i]);
		}
	}
	
	return 0;
} 
```

## 1003 Emergency (25 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805523835109376

翻译：许多城市，每个城市有救护队驻扎，每个城市之间有长度不同的路。你驻扎在c1，从c2传来呼救。你需要计算从c1到c2的最短路径（带权），和沿途召集的救护队的人数。

思路：带权有向图最短路径，Dijkstra算法。

dis[i]表示从出发点到i结点最短路径的路径长度，
num[i]表示从出发点到i结点最短路径的条数，
w[i]表示从出发点到i点救援队的数目之和

答案：

```
#include <iostream>
#include <algorithm>

using namespace std;

int n, m, c1, c2;
int e[510][510], // 边 
	weight[510], 
	dis[510], 
	num[510],   
	w[510];
bool visit[510];
const int inf = 99999999;

int main() {
	
    scanf("%d%d%d%d", &n, &m, &c1, &c2); // n:城市数量 m：路的数量 c1：你所在的城市 c2：呼救的城市 
    
    // 获取每座城市的救援队数量 
    for(int i = 0; i < n; i++) {
		scanf("%d", &weight[i]);
	}
    
	// 初始化数据    
    fill(e[0], e[0] + 510 * 510, inf);
    fill(dis, dis + 510, inf);
    
   	// 填充边 
    int a, b, c;
    for(int i = 0; i < m; i++) {
        scanf("%d%d%d", &a, &b, &c);
        e[a][b] = e[b][a] = c;
    }
    
    // 初始化数据 
    dis[c1] = 0; // dis[i]表示从出发点到i结点最短路径的路径长度 
    w[c1] = weight[c1]; // w[i]表示从出发点到i点救援队的数目之和
    num[c1] = 1; // num[i]表示从出发点到i结点最短路径的条数
    
    for(int i = 0; i < n; i++) {
    	
    	// 寻找未收入的顶点中dist最小的那个,赋给u 
        int u = -1, minn = inf;
        for(int j = 0; j < n; j++) {
            if(visit[j] == false && dis[j] < minn) {
                u = j;
                minn = dis[j];
            }
        }
        if(u == -1) break;
        visit[u] = true;
        
        // 遍历u相邻的节点（e[u][v] != inf） 
        for(int v = 0; v < n; v++) {
            if(visit[v] == false && e[u][v] != inf) {
                if(dis[u] + e[u][v] < dis[v]) { // v因为u的加入路径有更小的情况
					// 更新c1到v的，点权之和，边权之和，最短路径的条数 
                    dis[v] = dis[u] + e[u][v];
                    num[v] = num[u];
                    w[v] = w[u] + weight[v];
                } else if(dis[u] + e[u][v] == dis[v]) { // 最短路径相等 
                    num[v] = num[v] + num[u]; // 更新最短路径条数 
                    if(w[u] + weight[v] > w[v]) {
                    	w[v] = w[u] + weight[v]; // 更新最大点权 
					}
                }
            }
        }
    }
    
    printf("%d %d", num[c2], w[c2]); // c1到c2的最短路径的条数和最大点权 
    return 0;
}
```

## 1004 Counting Leaves (30 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805521431773184

翻译：N为总节点数，M为非叶节点数，问每一层各有多少叶子节点（no child）。

思路：遍历树（非二叉），记录每一层的叶节点数，有dfs与bfs两种遍历方式。

答案：

dfs

```
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;
vector<int> v[100];
int book[100], maxdepth = -1;

void dfs(int index, int depth) { // 节点编号，深度 
    if(v[index].size() == 0) { // 叶节点 
        book[depth]++; // 当前层叶节点数加1 
        maxdepth = max(maxdepth, depth); // 更新最大深度 
        return ;
    }
    for(int i = 0; i < v[index].size(); i++) {
		dfs(v[index][i], depth + 1);
	} 
}

int main() {
    int n, m, k, node, c;
    scanf("%d %d", &n, &m); // 节点总数，非叶节点数 
    
	for(int i = 0; i < m; i++) {
        scanf("%d %d",&node, &k); // 非叶节点二位编号，及其子节点数 
        for(int j = 0; j < k; j++) {
            scanf("%d", &c);
            v[node].push_back(c); // 存储其子节点 
        }
    }
    // 遍历节点 
    dfs(1, 0);
    // 打印每一层的叶结点 
    printf("%d", book[0]);
    for(int i = 1; i <= maxdepth; i++) {
    	printf(" %d", book[i]);
	}
    return 0;
}
```

bfs

```
#include <iostream>
#include <queue>
#include <vector>
#include <algorithm>

using namespace std;
int level[100], book[100], maxlevel = -1;
vector<int> v[100];

// bfs遍历，层序遍历（对树来说） 
void bfs() {
    queue<int> q;
    q.push(1);
    level[1] = 0;
    while(!q.empty()) {
        int index = q.front();
        q.pop();
        maxlevel = max(level[index], maxlevel); // 更新最大层数 
        if(v[index].size() == 0) { // 为叶子节点 
			book[level[index]]++; // 增加当前层的叶子节点数 
		}
		// 将index的所有子节点推入队列中 
        for(int i = 0; i < v[index].size(); i++) {
            q.push(v[index][i]);
            level[v[index][i]] = level[index] + 1; // index的所有子节点都是index的下一层 
        }
    }
}

int main() {
	
    int n, m, k, node, c;
    scanf("%d %d", &n, &m); // 总节点数，非叶子节点数 
    
    for(int i = 0; i < m; i++) {
        scanf("%d %d", &node, &k); // 节点编号与其子节点数
        for(int j = 0; j < k; j++) {
            scanf("%d", &c);
            v[node].push_back(c); // 存储其子节点 
        }
    }
    // 遍历 
    bfs();
    // 打印每一层的叶结点
    printf("%d", book[0]);
    for(int i = 1; i <= maxlevel; i++)
        printf(" %d", book[i]);
    return 0;
}
```


## 1005 Spell It Right (20 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805519074574336

翻译：输入一个数字，将数字按位相加，将相加后的数字按位输出英文。

思路：数字与字符的转化

答案：

```
#include <iostream>
using namespace std;
int main() {
	
    string a;
    cin >> a; // 输入数字 
    
    // 将数字每位累加 
    int sum = 0;
    for (int i = 0; i < a.length(); i++) {
		sum += (a[i] - '0'); 
	} 
        
    string s = to_string(sum);
    string arr[10] = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
    
    // 输出每位的英文  
	cout << arr[s[0] - '0'];
	for (int i = 1; i < s.length(); i++) {
		cout << " " << arr[s[i] - '0'];
	}
        
    return 0;
}
```

## 1006 Sign In and Sign Out (25 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805516654460928

翻译：输入一批人signIn与signOut的时间，找出最早signIn与最晚signOut的人的id。

思路：

00:00:00 作为起点，统一转化为秒数。

遍历，对比保存最早signIn与最晚signOut的人的id。

答案：

```
#include<string>
#include<cstdio>
#include<iostream>

using namespace std;

int main() {
    int n, minn = 9999999999999, maxn = -1;
    scanf("%d", &n);
    string unlocked, locked;
    
    for(int i = 0; i < n; i++) {
    	// id 
        string t;
        cin >> t;
        // signIn时间与signOut时间 
        int h1, m1, s1, h2, m2, s2;
        scanf("%d:%d:%d %d:%d:%d", &h1, &m1, &s1, &h2, &m2, &s2);
        // 全部转化为秒数，从00:00:00算起 
        int tempIn = h1 * 3600 + m1 * 60 + s1;
        int tempOut = h2 * 3600 + m2 * 60 + s2;
        // 更新最早signIn与最晚signOut 
        if (tempIn < minn) {
            minn = tempIn; // 最早时间 
            unlocked = t; // id 
        }
        if (tempOut > maxn) {
            maxn = tempOut; // 最晚时间 
            locked = t; // id 
        }
    }
    
	// 输出更新最早signIn与最晚signOut的id 
    cout << unlocked << " " << locked;
    return 0;
}
```

## 1007 Maximum Subsequence Sum (25 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805516654460928

翻译：计算最大子列和，输出子列和的数与子列和的位置

思路：最大子列和问题，采用在线处理的算法。

答案：

```
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    scanf("%d", &n);
    vector<int> v(n);
    int leftindex = 0, rightindex = n - 1, sum = -1, temp = 0, tempindex = 0;
    
    for (int i = 0; i < n; i++) {
        scanf("%d", &v[i]);
        temp = temp + v[i];
        if (temp < 0) { // 如果当前子列和为负，对子列无加成作用，重置子列 
            temp = 0;
            tempindex = i + 1;
        } else if (temp > sum) { // 如果当前子列大于原子列，更新sum，更新起始与结束 
            sum = temp;
            leftindex = tempindex;
            rightindex = i;
        }
    }
    if (sum < 0) sum = 0;
    printf("%d %d %d", sum, v[leftindex], v[rightindex]);
    return 0;
}
```

## 1008 Elevator (20 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805511923286016

翻译：起始在0层，上升需要6秒/层，下降需要4秒/层，每层需要停5秒，问走完需要多少秒

思路：依题意累加时间即可。

答案：

```
#include<iostream>

typedef long long ll;

using namespace std;

int main() {
	
    int N;
    cin >> N;
    
	int sum=0;
    int start=0;
	int endd=0;
	
    for(int i = 1; i <= N; i++) {
        cin >> endd;
        if (endd > start) { // 上升 
        	sum = sum + (endd - start) * 6 + 5; // 上升一层6秒，停留5秒 
        	start = endd;
		}
        else if(endd < start) { // 下降 
        	sum = sum + (start - endd) * 4 + 5; // 下降一层4秒，停留5秒
        	start = endd;
        }
        else { // 不动停留5秒 
            sum += 5;
			start = endd;
        }
    }
    
    cout << sum << endl;
}
```

## 1009 Product of Polynomials (25 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805509540921344

翻译：多项式乘法计算

思路：系数相乘，指数相加，逐项相乘

答案：

```
#include <iostream>

using namespace std;

int main() {
    int n1, n2, a, cnt = 0;
    
    // 输入第一个多项式 
    scanf("%d", &n1);
    double b, arr[1001] = {0.0}, ans[2001] = {0.0};
	for(int i = 0; i < n1; i++) {
        scanf("%d %lf", &a, &b);
        arr[a] = b;
    }
    
    // 输入第二个多项式 
    scanf("%d", &n2);
    for(int i = 0; i < n2; i++) {
        scanf("%d %lf", &a, &b);
        for(int j = 0; j < 1001; j++) {
			ans[j + a] += arr[j] * b; // 系数相乘，指数相加，不存在的项系数为0 
		}
    }
    
    // 统计结果的项数 
    for(int i = 2000; i >= 0; i--) {
		if(ans[i] != 0.0) cnt++;
	}
    printf("%d", cnt);
    
	// 打印结果 
    for(int i = 2000; i >= 0; i--) {
		if(ans[i] != 0.0) {
			printf(" %d %.1f", i, ans[i]);
		}
	} 
        
    return 0;
}
```

## 1010 **Radix (25 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805507225665536

翻译：给出两个数字，和其中一个数字的进制，找出另一个数字是否有进制转化后和前者相等。

思路：找出进制的可能范围，通过二分查找进制，将两个数字都转化为10位进行对比。

注：未理解透彻，可看算法指南练习P167

答案：

```
#include <cctype>
#include <algorithm>
#include <cmath>
#include <iostream>

using namespace std;

// 将n转化为10进制 
long long convert(string n, long long radix) {
    long long sum = 0;
    int index = 0, temp = 0;
    // 将radix进制转化为十进制算法 
    for (auto it = n.rbegin(); it != n.rend(); it++) {
        temp = isdigit(*it) ? *it - '0' : *it - 'a' + 10; // isdigit是否为数字 
        sum += temp * pow(radix, index++); // 从个位反向累加 
    }
    return sum;
}

// num为10进制数 
long long find_radix(string n, long long num) {
    char it = *max_element(n.begin(), n.end()); // 获取n中最大的一位数
	// 进制范围，下界为n所有数位中最大的加1，上界为low与num十进制的较大值
    long long low = (isdigit(it) ? it - '0': it - 'a' + 10) + 1;
    long long high = max(num, low);
    // 二分查找，试出进制 
	while (low <= high) {
        long long mid = (low + high) / 2;
        long long t = convert(n, mid);
        if (t < 0 || t > num) { // 进制过大，往小里找 
			high = mid - 1;
		}
        else if (t == num) { // 得到需要的进制 
			return mid;
		}
        else { // 进制过小，往大里找 
        	low = mid + 1;	
		} 
    }
    return -1;
}

int main() {
	
    string n1, n2;
    long long tag = 0, radix = 0, result_radix;
    
    cin >> n1 >> n2 >> tag >> radix;
    
    result_radix = tag == 1 ? find_radix(n2, convert(n1, radix)) : find_radix(n1, convert(n2, radix));
    
    if (result_radix != -1) {
        printf("%lld", result_radix);
    } else {
        printf("Impossible");
    }   
    return 0;
}
```

## 1011 World Cup Betting (20 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805504927186944

翻译：给出三个比赛的W，T，L的数据，根据公式计算出最后的收益

思路：

每一排中选最大的，再按照公式计算。

答案：

```
#include <iostream>
#include <algorithm>
#include <cstdio>

using namespace std;

// 比较三个中最大的 
double fmax(double a, double b, double c) {
	double t = max(a, b);
	return max(t, c);
}

int main() {
	
	double w, t, l, ans = 1;
	int k = 0;
	
	for(int i = 0; i < 3; i++) {
		scanf("%lf %lf %lf", &w, &t, &l);
		if(fmax(w,t,l) == w) {
			printf("%c ", 'W');
			ans *= w;
		} else if(fmax(w,t,l) == t){
			printf("%c ", 'T');
			ans *= t;
		} else {
			printf("%c ", 'L');
			ans *= l;
		}
	}
	
	ans = (ans * 0.65 - 1) * 2;
	printf("%.2lf\n", ans);
	return 0;
}
```

## 1012 The Best Rank (25 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805502658068480

翻译：每个考生有四门成绩，分别为C，M，E，A。对这四门成绩分别在全部的学生中排名，选出学生在自己的四门成绩中排名最高的科目，如果有排名相同的科目，按照ACME的优先顺序确定科目。

思路：理解题目很重要。后期要自己动手操作一遍。

答案：

```
#include <cstdio>
#include <algorithm>

using namespace std;

struct node {
    int id, best;
    int score[4], rank[4];
}stu[2005];

int exist[1000000], flag = -1;

bool cmp1(node a, node b) {
	return a.score[flag] > b.score[flag];
}

int main() {
    int n, m, id;
    scanf("%d %d", &n, &m);
    
	// 收录学生的各科成绩，并计算出平均分同时收录
    for(int i = 0; i < n; i++) {
        scanf("%d %d %d %d", &stu[i].id, &stu[i].score[1], &stu[i].score[2], &stu[i].score[3]);
        stu[i].score[0] = (stu[i].score[1] + stu[i].score[2] + stu[i].score[3]) / 3.0 + 0.5; // 四舍五入，+0.5取整 
    }
    
    // flag为科目 
    for(flag = 0; flag <= 3; flag++) {
        sort(stu, stu + n, cmp1); // 将学生排名 
        // 标记学生的各科排名 
		stu[0].rank[flag] = 1; // 第一名 
        for(int i = 1; i < n; i++) {
            stu[i].rank[flag] = i + 1;
            // 同分的情况排名相等 
            if(stu[i].score[flag] == stu[i-1].score[flag]) {
            	stu[i].rank[flag] = stu[i-1].rank[flag];
			}
        }
    }
    
    // 寻找每个学生最好排名的科目。 
    for(int i = 0; i < n; i++) {
        exist[stu[i].id] = i + 1; // 对存在的学生标记，存在的有编号
        // 默认平均成绩最优先 
        stu[i].best = 0;
        int minn = stu[i].rank[0]; // 平均成绩的排名优先最高 
        // 是否有排名比平均成绩还高的 
        for(int j = 1; j <= 3; j++) {
            if(stu[i].rank[j] < minn) {
                minn = stu[i].rank[j];
                stu[i].best = j;
            }
        }
    }
    
    
    char c[5] = {'A', 'C', 'M', 'E'};
    for(int i = 0; i < m; i++) {
        scanf("%d", &id);
        int temp = exist[id]; // 是否存在，并获得编号 
        if(temp) {
        	// 打印最好排名的科目 
            int best = stu[temp-1].best;
            printf("%d %c\n", stu[temp-1].rank[best], c[best]); // 打印科目排名与科目名称。 
        } else {
            printf("N/A\n"); // 不存在此id 
        }
    }
    
    return 0;
}
```

## 1013 Battle Over Cities (25 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805500414115840

翻译：N为总的城市数量，M为剩下的公路数量，K为需要被检查的城市数量。需要给出，当一座城市被占领了，需要修补几条路能使其他城市联通。

思路：一个连通图，去掉其中一个节点，假设变为a个连通分量，则最少需要a-1个边让他们相连。于是问题转化为，去掉一个节点之后，变为了几个连通分量。

答案：

```
#include <algorithm>

using namespace std;

int v[1010][1010];
bool visit[1010];
int n;

// 深度优先遍历 
void dfs(int node) {
    visit[node] = true;
    for(int i = 1; i <= n; i++) {
        if(visit[i] == false && v[node][i] == 1)
            dfs(i);
    }
}

int main() {
    int m, k, a, b;
    scanf("%d%d%d", &n, &m, &k); // N为总的城市数量，M为剩下的公路数量，K为需要被检查的城市数量
	
	// 构建图 
    for(int i = 0; i < m; i++) {
        scanf("%d%d", &a, &b);
        v[a][b] = v[b][a] = 1; // 无向图 
    }
    
    // 若干个城市被占领 
    for(int i = 0; i < k; i++) {
        fill(visit, visit + 1010, false); // 置空 
        scanf("%d", &a);
        int cnt = 0;
        visit[a] = true; // 城市被占领
		// 连通分量的数量统计 
        for(int j = 1; j <= n; j++) {
            if(visit[j] == false) {
                dfs(j);
                cnt++;
            }
        }
        printf("%d\n", cnt - 1); // 需要cnt-1个边可将连通分量相连 
    }
    
    return 0;
}
```

## 1014 **Waiting in Line (30 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805498207911936

翻译：N个窗口，每个窗口可以排M个人，8点开始服务，17点关门。队都排满了在黄线外等候，若有空位，则进入最短的队，若同时则选最小的窗口。求某个人的服务结束时间。

思路：

首先理解题目。

答案：

柳神写的：

```
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

struct node {
    int poptime, endtime; // 队首的人结束的时间，队尾的人结束的时间 
    queue<int> q;
};

int main() {
	
    int n, m, k, q, index = 1;
    scanf("%d%d%d%d", &n, &m, &k, &q); // N个窗口，每个窗口可排M个人，游客的人数，需要查询的游客 
    
	vector<int> time(k + 1), result(k + 1);
    
    // 各个游客办理业务的时间 
	for(int i = 1; i <= k; i++) {
        scanf("%d", &time[i]);
    }
    
	vector<node> window(n + 1);
    vector<bool> sorry(k + 1, false);
    
    // 对于前m*n个人，依次在窗口前排队，塞满
    for(int i = 1; i <= m; i++) { // 从小到大一层一层排队 
        for(int j = 1; j <= n; j++) {
            if(index <= k) { // 不能超过游客人数 
                window[j].q.push(time[index]);
                if(window[j].endtime >= 540) {
					sorry[index] = true;
				}
                window[j].endtime += time[index];
                if(i == 1) { // 第一层 
					window[j].poptime = window[j].endtime;
				}
                result[index] = window[j].endtime; // 结果 
                index++;
            }
            
        }
    }
    
    // 对于黄线外的 
    while(index <= k) {
    	// 找出可以进入排队的window(即最先有人出队的窗口)
        int tempmin = window[1].poptime, tempwindow = 1;
        for(int i = 2; i <= n; i++) {
            if(window[i].poptime < tempmin) {
                tempwindow = i;
                tempmin = window[i].poptime;
            }
        }
        // 当前窗口的人出队，并计算时间 
        window[tempwindow].q.pop();
        window[tempwindow].q.push(time[index]);
        window[tempwindow].poptime +=  window[tempwindow].q.front();
        if(window[tempwindow].endtime >= 540) {
        	sorry[index] = true;
		}
        window[tempwindow].endtime += time[index];
        result[index] = window[tempwindow].endtime; // 记录最新的进队的人的结束时间 
        index++;
    }
    // 查找查询的人的结束时间 
    for(int i = 1; i <= q; i++) {
        int query, minute;
        scanf("%d", &query);
        minute = result[query];
        if(sorry[query] == true) {
            printf("Sorry\n");
        } else {
            printf("%02d:%02d\n",(minute + 480) / 60, (minute + 480) % 60);
        }
    }
    return 0;
}
```

自己写的：

```
#include <cstdio>
#include <queue>
#include <vector>

using namespace std;

struct Window {
	int poptime, endtime; // 队首的人结束的时间，队尾的人结束的时间
	queue<int> q; 
};

int main () {
	
	int n, m, k, q; // 窗口的数量，每个窗口的容量，游客的数量，查询的数量
	
	scanf("%d %d %d %d", &n, &m, &k, &q);
	
	vector<int> pTime(k + 1), fTime(k + 1); // 处理时间，结束时间（时间单位为分钟，从0开始） 
	vector<bool> sorry(k + 1, false);
	
	// 客人编号从1到k 
	for (int i = 1; i < k + 1; i ++) {
		scanf("%d", &pTime[i]);
	}
	
	vector<Window> window(n + 1); // 窗口 
	
	int index = 1; // 客人编号 
	// 从左到右，从小到大 
	for (int i = 1; i < m + 1; i++) { // 层
		for (int j = 1; j < n + 1; j++) { // 列（从左到右） 
			if (index <= k) {
				window[j].q.push(pTime[index]); // 压入处理时间 
                if(window[j].endtime >= 540) { // 这个列已经时间排满了 
					sorry[index] = true;
				}
                window[j].endtime += pTime[index];
                if(i == 1) { // 第一层 
					window[j].poptime = window[j].endtime; // 最前头的顾客的结束时间 
				}
                fTime[index] = window[j].endtime; // 第index个顾客的结束时间确定 
                index++;
			} 
		}
	}
	
	// 黄线以外等待的
	while (index <= k) {
		
		// 找最先有人出队的窗口
		int tempmin = window[1].poptime, tempwindow = 1;
        for(int i = 2; i <= n; i++) {
            if(window[i].poptime < tempmin) {
                tempwindow = i;
                tempmin = window[i].poptime;
            }
        }
        // 当前窗口的人出队，并计算时间 
        window[tempwindow].q.pop();
        window[tempwindow].q.push(pTime[index]); // 当前index顾客入队 
        window[tempwindow].poptime +=  window[tempwindow].q.front();
        // 超过时间 
        if(window[tempwindow].endtime >= 540) {
        	sorry[index] = true;
		}
        window[tempwindow].endtime += pTime[index];
        // 记录最新的进队的人的结束时间
        fTime[index] = window[tempwindow].endtime;  
        index++;
	} 
	
	
	// 查询 
	for (int i = 1; i < q + 1; i++) {
		int query, minute;
        scanf("%d", &query);
        minute = fTime[query];
        if(sorry[query] == true) {
            printf("Sorry\n");
        } else {
            printf("%02d:%02d\n", (minute + 480) / 60, (minute + 480) % 60); // 从8:00（8*60）开始算起 
        }	
	} 
	
	return 0;
}
```

## 1015 Reversible Primes (20 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805495863296000

翻译：可翻转的素数是，本身是个素数，在某种进制下翻转后还是素数。

先转化为某种进制，翻转，再转化为十进制，看是否是素数

思路：先检查本身是否是素数，接着把数字转化为指定的进制，翻转后，再转化为10进制，查看是否为素数。

考点：素数的检查，把十进制转化为d进制：除基取余法，把d进制转化为十进制：累乘累加

答案：

柳神答案：
```
#include <cmath>
#include <cstdio> 

using namespace std;

// 是否是素数 
bool isprime(int n) {
    if(n <= 1) return false;
    int sqr = int(sqrt(n * 1.0));
    for(int i = 2; i <= sqr; i++) {
        if(n % i == 0) {
			return false;
		}
    }
    return true;
}

int main() {
    int n, d;
    while(scanf("%d", &n) != EOF) {
        if(n < 0) break;
        scanf("%d", &d); // 进制 
        if(isprime(n) == false) {
            printf("No\n");
            continue;
        }
        // 将十进制转化为d进制，除基取余法 
        int len = 0, arr[100];
        do{
            arr[len++] = n % d;
            n = n / d;
        }while(n != 0);
        // 将d进制转化为十进制，并从高位到低位转化（反转数字） 
        for(int i = 0; i < len; i++) {
        	n = n * d + arr[i];
		}
        printf("%s", isprime(n) ? "Yes\n" : "No\n");
    }
    return 0;
}
```

自己写的

```
#include <cstdio>
#include <cmath>

using namespace std;

bool isPrime (int n) {
	if (n <= 1) {
		return false;
	}
	int sqr = int(sqrt(1.0 * n));
	for (int i = 2; i <= sqr; i++) {
		if (n % i == 0) {
			return false; // 能够除净，不是素数 
		}
	}
	return true;
}

int main () {
	
	while (1) {
		
		int n = 0;
		int d = 0;
		scanf("%d", &n); // 数字 
		if (n < 0) {
			break;
		}
		scanf("%d", &d); // 进制 
		
		if (!isPrime(n)) {
			printf("No\n");
			continue;
		}
		
		int res[1000], len = 0;
		
		// 转化为d进制 
		while (n != 0) {
			res[len++] = n % d;
			n = n / d;
		}
		
		int j = 0;
		// d进制翻转转化为十进制 
		for (int i = len - 1; i >= 0; i--) {
			n += res[i] * pow(d, j);
			j++;
		} 

//		printf(" n:%d ", n);
		
		printf("%s", isPrime(n) ? "Yes\n" : "No\n");
		
	} 
	
	return 0;
}
```

## 1016 **Phone Bills (25 分)

翻译：题目给了一天每个小时的费率，与n条通话记录，通话记录为on-line开始，off-line结束，应该成对出现，不符合规律的可忽略。请你求出每个人的具体通话账单，其中有月份，通话开始时间，结束时间，持续时间，各个费用，总费用。

思路：读懂题目，组织好数据结构。

答案：

```
#include <iostream>
#include <map>
#include <vector>
#include <algorithm>

using namespace std;

struct node {
    string name;
    int status, month, time, day, hour, minute;
};

bool cmp(node a, node b) {
    return a.name != b.name ? a.name < b.name : a.time < b.time; // 先按照姓名排序，再按照时间的先后顺序排列 
}

double billFromZero(node call, int *rate) {
    double total = rate[call.hour] * call.minute + rate[24] * 60 * call.day;
    for (int i = 0; i < call.hour; i++)
        total += rate[i] * 60;
    return total / 100.0;
}

int main() {
    int rate[25] = {0}, n;
    // 每个小时的费率 
    for (int i = 0; i < 24; i++) {
        scanf("%d", &rate[i]);
        rate[24] += rate[i];
    }
    scanf("%d", &n);
    
    vector<node> data(n);
    
	// 输入数据 
	for (int i = 0; i < n; i++) {
        cin >> data[i].name; // 名字 
        scanf("%d:%d:%d:%d", &data[i].month, &data[i].day, &data[i].hour, &data[i].minute); // 时间 
        string temp;
        cin >> temp; // flag in-line off-line 
        data[i].status = (temp == "on-line") ? 1 : 0;
        data[i].time = data[i].day * 24 * 60 + data[i].hour * 60 + data[i].minute;
    }
    // 先按照姓名排序，再按照时间的先后顺序排列 
    sort(data.begin(), data.end(), cmp);
    map<string, vector<node> > custom;
    
    // 相同名字的两个，前一个为in-line，后一个为off-line，可以push进custom中 
    for (int i = 1; i < n; i++) {
        if (data[i].name == data[i - 1].name && data[i - 1].status == 1 && data[i].status == 0) {
            custom[data[i - 1].name].push_back(data[i - 1]);
            custom[data[i].name].push_back(data[i]);
        }
    }
    
    // 遍历custom, it为迭代器，it.first为key，it.second为value 
    for (auto it : custom) {
        vector<node> temp = it.second; // value
        cout << it.first; // 打印名字,key
        printf(" %02d\n", temp[0].month); // 打印月份 
        double total = 0.0;
        for (int i = 1; i < temp.size(); i += 2) {
            double t = billFromZero(temp[i], rate) - billFromZero(temp[i - 1], rate); // 计算账单
            // 打印开始时间，结束时间，持续时间，账单 
            printf("%02d:%02d:%02d %02d:%02d:%02d %d $%.2f\n", temp[i - 1].day, temp[i - 1].hour, temp[i - 1].minute, temp[i].day, temp[i].hour, temp[i].minute, temp[i].time - temp[i - 1].time, t);
            total += t; // 累计总账单 
        }
        printf("Total amount: $%.2f\n", total);
    }
    return 0;
}
```

## 1017 Queueing at Bank (25 分)

翻译：K个窗口服务，顾客需在黄线外等待，直到有空余的窗口。假设窗口不能被单一客人占用一小时。给你每个顾客的到达时间和每个顾客的“等待时间”。银行上班时间为8点到17点。

思路：所求的时间为顾客的等待时间，即人到了但是没有空闲的窗口。将顾客按照到达时间排序，将当前最快能空出的窗口进行服务。

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct node {
	int come, time;
} tempcustomer;

// 按照到达时间排序 
bool cmp1(node a, node b) {
    return a.come < b.come;
}

int main() {
	
    int n, k;
    scanf("%d%d", &n, &k); // 顾客的人数，窗口的人数 
    
	vector<node> custom;
    
	for(int i = 0; i < n; i++) {
        int hh, mm, ss, time;
        scanf("%d:%d:%d %d", &hh, &mm, &ss, &time); // 时，分，秒，耗时 
        int cometime = hh * 3600 + mm * 60 + ss;
        if (cometime > 61200) { // 超过17:00忽略
			continue;
		}
        tempcustomer = {cometime, time * 60}; // 到达时间，耗时 
        custom.push_back(tempcustomer); 
    }
    // 按照到达时间排序
    sort(custom.begin(), custom.end(), cmp1);
    
    vector<int> window(k, 28800); // 大小为k，初始值为28800 
    double result = 0.0;
    
    // 遍历 
	for(int i = 0; i < custom.size(); i++) {
		// 最快要完成的窗口
        int tempindex = 0, minfinish = window[0]; 
        for(int j = 1; j < k; j++) {
            if(minfinish > window[j]) {
                minfinish = window[j];
                tempindex = j;
            }
        }
        
         // 若最快要完成的窗口的完成时间，比当前顾客来的时间早，顾客马上就可以办理业务 
        if(window[tempindex] <= custom[i].come) { 
            window[tempindex] = custom[i].come + custom[i].time; // 更新窗口时间
        } else {
        	// 否则顾客需要等待，等待的时间为，预计窗口完成的时间减去到来的时间 
            result += (window[tempindex] - custom[i].come);
            window[tempindex] += custom[i].time; // 更新窗口时间 
        }
    }
    
    if(custom.size() == 0) {
		printf("0.0");
	}
	else {
		printf("%.1f", result / 60.0 / custom.size());
	}
        
    return 0;
}
```

## 1018 **Public Bike Management (30 分)

翻译：PBMC监控所有的车站，力图让所有的车站保持在完美状态-即半满状态。如果有车站是满的或者空的，PBMC需要找到最短的路去那个车站收集或者放置车，如果有两个同样短的路线，选带的车最少的路线。输入为Cmax：车站最大容量，N：车站的数量，Sp：有问题车站的编号，M：路的数量。第二行N个数字表示各个车站现在的车的数量。接下来M行的边的数据。

思路：太难了，没有完全理解

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

const int inf = 99999999;
int cmax, n, sp, m;
int minNeed = inf, minBack = inf;
int e[510][510], dis[510], weight[510];
bool visit[510];
vector<int> pre[510], path, temppath;

void dfs(int v) {
    temppath.push_back(v); // 塞入路径
	// 到达原点 
    if(v == 0) {
        int need = 0, back = 0;
        for(int i = temppath.size() - 1; i >= 0; i--) {
            int id = temppath[i];
            if(weight[id] > 0) {
                back += weight[id];
            } else {
                if(back > (0 - weight[id])) {
                    back += weight[id];
                } else {
                    need += ((0 - weight[id]) - back);
                    back = 0;
                }
            }
        }
        if(need < minNeed) {
            minNeed = need;
            minBack = back;
            path = temppath;
        } else if(need == minNeed && back < minBack) {
            minBack = back;
            path = temppath;
        }
        temppath.pop_back();
        return ;
    }
    for(int i = 0; i < pre[v].size(); i++) {
		dfs(pre[v][i]);
	}
    temppath.pop_back();
}

int main() {
	// 初始化e与dist都为inf 
    fill(e[0], e[0] + 510 * 510, inf);
    fill(dis, dis + 510, inf);
    // 每个车站的最大容量，车站的总数，有问题车站的编号，路的数量 
    scanf("%d%d%d%d", &cmax, &n, &sp, &m);
    // 每个车站当前的车的数量 
    for(int i = 1; i <= n; i++) {
        scanf("%d", &weight[i]);
        weight[i] = weight[i] - cmax / 2; // 比一半大为正，比一半小为负 
    }
    // 车站与车站之间的边，有权 
    for(int i = 0; i < m; i++) {
        int a, b;
        scanf("%d%d", &a, &b);
        scanf("%d", &e[a][b]);
        e[b][a] = e[a][b];
    }
    
    dis[0] = 0; // 初始原点为0 
    
    // Dijkstra求最短路径
	for(int i = 0; i <= n; i++) {
		// 找dist最近的那个赋给u 
        int u = -1, minn = inf;
        for(int j = 0; j <= n; j++) {
            if(visit[j] == false && dis[j] < minn) {
                u = j;
                minn = dis[j];
            }
        }
        if(u == -1) break;
        visit[u] = true;
        // 遍历与u相邻的节点，更新路径 
        for(int v = 0; v <= n; v++) {
            if(visit[v] == false && e[u][v] != inf) {
                if(dis[v] > dis[u] + e[u][v]) { // 从u走距离更短 
                    dis[v] = dis[u] + e[u][v];
                    pre[v].clear();
                    pre[v].push_back(u);
                }else if(dis[v] == dis[u] + e[u][v]) { // 相同长度的路径 
                    pre[v].push_back(u);
                }
            }
        }
    }
    
	dfs(sp);
    
	printf("%d 0", minNeed);
    for(int i = path.size() - 2; i >= 0; i--)
        printf("->%d", path[i]);
    printf(" %d", minBack);
    return 0;
}
```

## 1019 General Palindromic Number (20 分)

翻译：给一个十进制的数，和一个进制d，检查转化为d进制之后，数是不是回文的。

思路：主要检测，十进制转化为d进制，采用“除基取余法”。

答案：

```
#include <cstdio>

using namespace std;

int main() {
	
	int a, b;
	scanf("%d %d", &a, &b); // 十进制数，进制 
	
	int arr[40], index = 0;
	
	// 除基取余法 
	while(a != 0) {
		arr[index++] = a % b;
		a = a / b;
	}
	int flag = 0;
	// 检查是否对称 
	for(int i = 0; i < index / 2; i++) {
		if(arr[i] != arr[index-i-1]) {
			printf("No\n");
			flag = 1;
			break;
		}
	}
	if(!flag) printf("Yes\n");
	
	// 输出进制转化之后的数字（从后向前输出） 
	for(int i = index - 1; i >= 0; i--) {
		printf("%d", arr[i]);
		if(i != 0) printf(" ");
	}
	if(index == 0)
		printf("0");
	return 0;
}
```

## 1020 Tree Traversals (25 分)

翻译：假设二叉树所有的key都是不重复的正整数，给你后序遍历与中序遍历序列，你给出层序遍历的序列。

思路：后序遍历与中序遍历可以确定一棵树。2i+1为左子树，2i+2为右子树。

答案：

```
#include <iostream>
#include <vector>

using namespace std;
vector<int> post, in, level(100000, -1);

// root：后序根节点的位置，start：中序的start，end：中序的end，index：在层序中的序号 
void pre(int root, int start, int end, int index) {
    if(start > end) return ;
    int i = start;
    while(i < end && in[i] != post[root]) i++; // 在中序中找到根节点 
    level[index] = post[root];
    // 左子树在后序中根节点的位置，在中序中的start和end，在层序中左子树为2*index+1
    pre(root - 1 - end + i, start, i - 1, 2 * index + 1); 
    // 右子树在后序中根节点的位置，在中序中的start和end，在层序中左子树为2*index+1
    pre(root - 1, i + 1, end, 2 * index + 2);
}

int main() {
    int n, cnt = 0;
    scanf("%d", &n);
    
    // 改变容器的大小
	post.resize(n);
    in.resize(n);
    
    // 读入后序与中序序列的数据 
	for(int i = 0; i < n; i++) scanf("%d", &post[i]);
    for(int i = 0; i < n; i++) scanf("%d", &in[i]);
    
	pre(n-1, 0, n-1, 0);
    
	for(int i = 0; i < level.size(); i++) {
        if (level[i] != -1) {
            if (cnt != 0) printf(" ");
            printf("%d", level[i]);
            cnt++;
        }
        if (cnt == n) break;
    }
    return 0;
}
```

## 1021 **Deepest Root (25 分)

算法笔记上机实战P343

翻译：第一行给一个正整数N，后面给出N-1条边。找到一个节点，这个节点作为树根生成的树最深，若有多个这种节点，则输出他的连通分量。

思路：若不为连通图，则输出其连通分量。若为连通图，从任意顶点DFS找到最深的顶点，这些顶点们记为集合A，从集合A中任意选一个顶点，再DFS找到最深的顶点，记为集合B，集合A与集合B的并集就是要求的。其正确性证明在《算法笔记上机实战》的P344。

答案：

```
#include <iostream>
#include <vector>
#include <set>
#include <algorithm>

using namespace std;

int n, maxheight = 0;
vector<vector<int>> v;
bool visit[10010];
set<int> s;
vector<int> temp;

// 深度优先遍历 
void dfs(int node, int height) {
    if(height > maxheight) {
        temp.clear();
        temp.push_back(node);
        maxheight = height;
    } else if(height == maxheight){
        temp.push_back(node); 
    }
    visit[node] = true;
    for(int i = 0; i < v[node].size(); i++) {
        if(visit[v[node][i]] == false)
            dfs(v[node][i], height + 1);
    }
}

int main() {
    scanf("%d", &n); // n个顶点 
    v.resize(n + 1);
    int a, b, cnt = 0, s1 = 0;
    // n-1条边 
    for(int i = 0; i < n - 1; i++) {
        scanf("%d%d", &a, &b);
        v[a].push_back(b);
        v[b].push_back(a);
    }
    // 计算连通分量 
    for(int i = 1; i <= n; i++) {
        if(visit[i] == false) {
            dfs(i, 1); // 第一次遍历 
            if(i == 1) {
                if (temp.size() != 0) {
					s1 = temp[0]; // 第一次遍历最深顶点集合的第一个 
				}
                for(int j = 0; j < temp.size(); j++) {
                	s.insert(temp[j]); // 第一次遍历最深顶点集合放入s中 
				}
            }
            cnt++;
        }
    }
    if(cnt >= 2) {
        printf("Error: %d components", cnt);
    } else {
        temp.clear();
        maxheight = 0;
        fill(visit, visit + 10010, false); // 重置visit 
        dfs(s1, 1); // 第二次遍历 
        for(int i = 0; i < temp.size(); i++) {
        	s.insert(temp[i]); // 第二次遍历最深顶点集合放入s中 
		}
        for(auto it = s.begin(); it != s.end(); it++) {
        	printf("%d\n", *it); // 输出全部顶点 
		}
    }
    return 0;
}
```

## 1022 **Digital Library (30 分)

翻译：模拟电子图书馆查询，给出n本书的信息，信息分类有m种。查询的时候根据信息分类来对应查询ID，有多个ID的递增输出ID。

思路：

考察map的思想，一个分类给一个map。

自己动手做一遍

答案：

柳神写的：

```
#include <iostream>
#include <map>
#include <set>

using namespace std;

map<string, set<int> > title, author, key, pub, year;

// 查询 
void query(map<string, set<int> > &m, string &str) { // 分类map，分类下的关键字 
    if(m.find(str) != m.end()) { // 找到了 
        // 遍历输出 
		for(auto it = m[str].begin(); it != m[str].end(); it++)
            printf("%07d\n", *it);
    } else // 未找到 
        cout << "Not Found\n";
}

int main() {
	
    int n, m, id, num;
    scanf("%d", &n); // n本书 
    string ttitle, tauthor, tkey, tpub, tyear;
    
	for(int i = 0; i < n; i++) {
        scanf("%d\n", &id);
        // 标题 
        getline(cin, ttitle);
        title[ttitle].insert(id);
        // 作者 
		getline(cin, tauthor);
        author[tauthor].insert(id);
        // 关键字 
		while(cin >> tkey) {
            key[tkey].insert(id);
            char c = getchar();
            if(c == '\n') break;
        }
        // 出版商 
        getline(cin, tpub);
        pub[tpub].insert(id);
    	// 出版年份 
		getline(cin, tyear);
        year[tyear].insert(id);
    }
    
    // m个查询 
    scanf("%d", &m);
    
	for(int i = 0; i < m; i++) {
        scanf("%d: ", &num); // 对应的分类 
        string temp;
        getline(cin, temp); // 对应分类的具体关键字 
        cout << num << ": " << temp << "\n";
        // 查询 
        if(num == 1) query(title, temp); // 书名 
        else if(num == 2) query(author, temp); // 作者  
        else if(num == 3) query(key, temp); // 关键字 
        else if(num == 4) query(pub,temp); // 出版商 
        else if(num ==5) query(year, temp); // 出版年份 
    }
    return 0;
}
```

自己写的：

```
#include <cstdio>
#include <iostream>
#include <string>

using namespace std;

map<string, set<int> > title, author, keyWord, pub, pubYear;

// 查询与输出结果 
void query (map<string, set<int> > &m, string &str) { // 引用输入 
	if (m.find(str) != m.end()) {
		// 遍历输出set内的数据 
		for (auto it = m[str].begin(); it != m[str].end(); it++) {
			printf("%07d\n", *it); // 7位数字，0补全 
		}
	} else {
		cout << "Not Found\n"
	}
} 

int main () {
	
	int n;
	scanf("%d", &n);
	
	string ttitle, tauthor, tkeyWord, tpub, tpubYear;
	
	// 输入 
	for (int i = 0; i < n; i++) {
		
		int id;
		scanf("%d\n", id);
		
		// 标题 
		getline(cin, ttitle);
		title[ttitle].insert(id);
		
		// 作者 
		getline(cin, tauthor);
		title[tauthor].insert(id);
		
		// 关键字
		while (cin >> tkeyWord) {
			keyWord[tkeyWord].insert(id);
			char c = getchar();
			if (c == '\n') break;
		} 
		
		// 出版商 
		getline(cin, tpub);
		pub[tpub].insert(id);
		
		// 出版年份 
		getline(cin, tpubYear);
		pubYear[tpubYear].insert(id);
		 
	}
	
	// 查询 
	int m;
	scanf("%d", &m);
	
	for (int i = 0; i < m; i++) {
		
		// 查询编号 
		int num;
		scanf("%d: ", &num);
		
		// 查询字符串 
		string tempStr;
		getline(cin, tempStr);
		
		// 重复输出查询数据 
		cout << num << ": " << temp << "\n";
		
		if(num == 1) query(title, tempStr); // 书名 
        else if(num == 2) query(author, tempStr); // 作者  
        else if(num == 3) query(key, tempStr); // 关键字 
        else if(num == 4) query(pub, tempStr); // 出版商 
        else if(num ==5) query(year, tempStr); // 出版年份 
		
	}
	
	return 0;
}
```

## 1023 Have Fun with Numbers (20 分)

翻译：翻倍一个k位数的数字，看是否翻倍的数字中的数字排列是否和原来的一样。

思路：

题目给出，不超过20位，即超过了long long 的范围，判断用大整数计算。

大整数计算。理解题意。

答案：


柳神写的
```
#include <cstdio>
#include <string.h>

using namespace std;

int book[10];

int main() {
    char num[22];
    scanf("%s", num); // 输入的数字，用char储存 
    int flag = 0, len = strlen(num);
    // 位数从小到大 
    for(int i = len - 1; i >= 0; i--) {
        int temp = num[i] - '0'; // char转数字 
        book[temp]++;
        temp = temp * 2 + flag; // 乘2加进位 
        flag = 0;
        // 超10进1 
        if(temp >= 10) {
            temp = temp - 10;
            flag = 1;
        }
        num[i] = (temp + '0'); // 数字转char 
        book[temp]--; 
    }
    int flag1 = 0;
    // 若book中有不为0的即上面的循环中没有对称加减 
    for(int i = 0; i < 10; i++) {
        if(book[i] != 0)
            flag1 = 1;
    }
    printf("%s", (flag == 1 || flag1 == 1) ? "No\n" : "Yes\n"); // 有进位肯定不相同 
    if(flag == 1) printf("1"); // 最高一位有进1 
    printf("%s", num);
    return 0;
}
```

自己写的：

```
#include <cstdio>
#include <string>
#include <iostream>

using namespace std;

int main () {
	
	string a;
	
	int count[100] = { 0 }; // 计数用 
	
	int output[100] = { 0 }; // 结果 
	
	cin >> a;
	
	int len = a.length();
	
	int add = 0; // 进位 
	
	for (int i = len - 1; i >= 0; i--) {
		
		int temp = a[i] - '0';
		
		// 计数 
		count[temp]++;
		
		// 相加 
		int res = temp * 2 + add;
		// 是否进位 
		if (res > 9) {
			res = res - 10;
			add = 1;
		} else {
			add = 0;
		}
		
		output[i] = res; // 存入结果
		
		// 反向计数 
		count[res]--; 
		
	} 
	
	int flag = 0;
	
	for (int i = 0; i < 10; i++) {
		if (count[i] != 0) {
			flag = 1;
		}
	}
	
	if (flag == 1 || add == 1) {
		printf("No\n");
	} else {
		printf("Yes\n");
	}
	
	// 最后有进位
	if (add == 1) {
		printf("1");
	}
		
	for (int i = 0; i < len; i++) {
		printf("%d", output[i]);
	}
	
	return 0;
}
```

## 1024 Palindromic Number (25 分)

翻译：对称数字就是正向写和反向写是一样的。非对称数字可以通过一系列操作变为对称的，首先将数字翻转，然后将翻转的数字与原来的数字相加，若不是对称数字则重复以上步骤。输入：N一个原始数字，K最多的步数。输出：第一行为：对称数字和用的步数，如果在规定步数内还没有达到，则输出第K步的结果。

思路：大整数计算，翻转，加法。

答案：

```
#include <iostream>
#include <algorithm>

using namespace std;
string s;

// 大整数加法 
void add(string t) {
    int len = s.length(), carry = 0;
    // 大整数加法，数组的低位就是数字的低位 
    for(int i = 0; i < len; i++) {
        s[i] = s[i] + t[i] + carry - '0'; // 计算的暂时转化为int，赋值的时候又改为string了 
        carry = 0;
        if(s[i] > '9') {
            s[i] = s[i] - 10;
            carry = 1;
        }
    }
    if(carry) s += '1';
    reverse(s.begin(), s.end());
}

int main() {
	
    int cnt, i;
    cin >> s >> cnt;
    
	for(i = 0; i <= cnt; i++) {
        string t = s;
        reverse(t.begin(), t.end());
        if(s == t || i == cnt) break; // 如果正反一样或者到了规定步数则退出 
        add(t); // 正反相加 
    }
    cout << s << endl << i;
    return 0;
}
```

## 1025 **PAT Ranking (25 分)

翻译：有n个考场，每个考场有一些学生，考试结束后，计算出所有考生的编号，排名，考场号，考场内排名。

思路：排序函数的编写，分数大的排前面，分数相同的情况，编号小的排前面。

自己做一遍，比较典型的题型

答案：

```
#include <cstdio>
#include <algorithm>
#include <vector>

using namespace std;

struct student {
    long long int no;
    int score, finrank, loca, locarank;
};

bool cmp1(student a, student b) {
    return a.score != b.score ? a.score > b.score : a.no < b.no;
}

int main() {
    int n, m;
    scanf("%d", &n); // n个考场 
    vector<student> fin;
    for(int i = 1; i <= n; i++) {
        scanf("%d", &m); // 每个考场m个学生 
        vector<student> v(m);
        // 每个学生的学号，成绩，考场编号 
        for(int j = 0; j < m; j++) {
            scanf("%lld %d", &v[j].no, &v[j].score);
            v[j].loca = i; // 考场编号 
        }
        sort(v.begin(), v.end(), cmp1); // 本地排序
		// 本地排名标记 
        v[0].locarank = 1; // 本地排名第一名 
        fin.push_back(v[0]);
        for(int j = 1; j < m; j++) {
        	// 若与上一个分数相同，则排名相同，若不同，则在真实排名上加一 
            v[j].locarank = (v[j].score == v[j - 1].score) ? (v[j - 1].locarank) : (j + 1); 
            fin.push_back(v[j]);
        }
    }
    // 全部排序 
    sort(fin.begin(), fin.end(), cmp1);
    // 全部排名第一名 
	fin[0].finrank = 1;
    for(int j = 1; j < fin.size(); j++) {
    	// 排名标记规则与本地排名相同 
		fin[j].finrank = (fin[j].score == fin[j - 1].score) ? (fin[j - 1].finrank) : (j + 1);
	}
	// 输出结果 
    printf("%d\n", fin.size());
    for(int i = 0; i < fin.size(); i++) {
    	printf("%013lld %d %d %d\n", fin[i].no, fin[i].finrank, fin[i].loca, fin[i].locarank);
	}
    return 0;
}
```

## 1026 **Table Tennis (30 分)

翻译：排队打乒乓球，有分vip桌与普通桌。

思路：排队问题，十分典型，可与1014做对比。

排队问题，十分典型

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

struct person {
    int arrive, start, time;
    bool vip;
}tempperson;

struct tablenode {
    int end = 8 * 3600, num;
    bool vip;
};

bool cmp1(person a, person b) {
    return a.arrive < b.arrive;
}

bool cmp2(person a, person b) {
    return a.start < b.start;
}

vector<person> player;
vector<tablenode> table;

// 入桌 
void alloctable(int personid, int tableid) {
    if(player[personid].arrive <= table[tableid].end)
        player[personid].start = table[tableid].end;
    else
        player[personid].start = player[personid].arrive;
    table[tableid].end = player[personid].start + player[personid].time;
    table[tableid].num++;
}

// 找到下一个vip的编号 
int findnextvip(int vipid) {
    vipid++;
    while(vipid < player.size() && player[vipid].vip == false) vipid++;
    return vipid;
}

int main() {
    int n, k, m, viptable;
    scanf("%d", &n); // n名游客 
    for(int i = 0; i < n; i++) {
        int h, m, s, temptime, flag;
        // 构造tempperson 
        scanf("%d:%d:%d %d %d", &h, &m, &s, &temptime, &flag);
        tempperson.arrive = h * 3600 + m * 60 + s; // 到达时间，单位s 
        tempperson.start = 21 * 3600; // 开始时间，先定21点 
        if(tempperson.arrive >= 21 * 3600) continue; // 若超过21点到达，无效 
        tempperson.time = temptime <= 120 ? temptime * 60 : 7200; // 若超过2小时，一律按两小时计算 
        tempperson.vip = ((flag == 1) ? true : false); // 是否是vip 
        player.push_back(tempperson);
    }
    scanf("%d%d", &k, &m); //总桌数，vip桌数 
    table.resize(k + 1);
    for(int i = 0; i < m; i++) {
        scanf("%d", &viptable); // vip桌的桌号 
        table[viptable].vip = true;
    }
    sort(player.begin(), player.end(), cmp1); // 按照到达时间的先后排序 
    int i = 0, vipid = -1;
    vipid = findnextvip(vipid); // 找到下一个vip的编号
	 
	// 开始排队 
    while(i < player.size()) {
        int index = -1, minendtime = 999999999;
        // 寻找空闲的桌子 
        for(int j = 1; j <= k; j++) {
            if(table[j].end < minendtime) {
                minendtime = table[j].end;
                index = j;
            }
        }
        if(table[index].end >= 21 * 3600) break;
        
		// 若队首是vip，i<vipid，则表示当前vip已经插队了，跳过 
        if(player[i].vip == true && i < vipid) {
            i++;
            continue;
        }
       	 
        if(table[index].vip == true) { // 如果vip桌空闲 
            if(player[i].vip == true) { // 队首是vip，直接入桌 
                alloctable(i, index);
                if(vipid == i) vipid = findnextvip(vipid);
                i++;
            } else { // 队首不是vip 
            	// 还有vip存在，并且已经在排队中，直接插队 
                if(vipid < player.size() && player[vipid].arrive <= table[index].end) {
                    alloctable(vipid, index);
                    vipid = findnextvip(vipid);
                } else { // 若没有vip排队，则安排当前队首入桌 
                    alloctable(i, index);
                    i++;
                }
            }
        } else { // 如果普通桌空闲
            if(player[i].vip == false) { // 不是vip在队首，直接入桌 
                alloctable(i, index);
                i++;
            } else { // vip在队首 
                int vipindex = -1, minvipendtime = 999999999;
                // 寻找最早空闲的vip桌子 
				for(int j = 1; j <= k; j++) {
                    if(table[j].vip == true && table[j].end < minvipendtime) {
                        minvipendtime = table[j].end;
                        vipindex = j;
                    }
                }
                // 若有空闲的vip桌子，则进入vip桌子 
                if(vipindex != -1 && player[i].arrive >= table[vipindex].end) {
                    alloctable(i, vipindex);
                    if(vipid == i) vipid = findnextvip(vipid);
                    i++;
                } else { // 若没有空闲的vip桌子，则进入普通桌子
                    alloctable(i, index);
                    if(vipid == i) vipid = findnextvip(vipid);
                    i++;
                }
            }
        }
    }
    
    // 最后全部人按照开始时间排序 
    sort(player.begin(), player.end(), cmp2);
    
    for(i = 0; i < player.size() && player[i].start < 21 * 3600; i++) {
        printf("%02d:%02d:%02d ", player[i].arrive / 3600, player[i].arrive % 3600 / 60, player[i].arrive % 60);
        printf("%02d:%02d:%02d ", player[i].start / 3600, player[i].start % 3600 / 60, player[i].start % 60);
        printf("%.0f\n", round((player[i].start - player[i].arrive) / 60.0));
    }
    for(int i = 1; i <= k; i++) {
        if(i != 1) printf(" ");
        printf("%d", table[i].num);
    }
    return 0;
}
```


## 1027 Colors in Mars (20 分)

翻译：火星人的颜色是用13进制表示的，将地球的十进制RGB转化为火星的13进制RGB。

思路：给3个十进制的数（范围0~168），转化为十三进制的数。因为168转化为13进制为CC，即不会超过两位数。所以，采用除基取余法，两位就可以了

答案：

```
#include <cstdio>

using namespace std;

int main() {
    char c[14] = {"0123456789ABC"};
    printf("#");
    for(int i = 0; i < 3; i++) {
        int num;
        scanf("%d", &num);
        printf("%c%c", c[num/13], c[num%13]); // 除基取余法 
    }
    return 0;
}
```

## 1028 List Sorting (25 分)

翻译：模拟excel的排序功能，C=1按照ID升序排列，C=2按照名字非降序排列，C=3按照分数非降序排列，如果名字和分数相同，则按照ID升序排列。

思路：写比较函数，注意strcmp的使用。排序题型，比较典型。

答案：

```
#include <iostream>
#include <algorithm>
#include <string.h>

using namespace std;

const int maxn = 100001;

struct NODE {
    int no, score; // ID，成绩 
    char name[10]; // 名字 
}node[maxn];

int c;

// 排序函数 
int cmp1(NODE a, NODE b) {
    if(c == 1) { // 按ID排序，升序 
        return a.no < b.no;
    } else if(c == 2) { // 按名字排序 
        if(strcmp(a.name, b.name) == 0) return a.no < b.no; // 名字相同按ID升序 
        return strcmp(a.name, b.name) <= 0; // 名字不同 
    } else { // 按成绩排序
        if(a.score == b.score) return a.no < b.no; // 成绩相同，按ID升序  
        return a.score <= b.score; // 成绩非降排序 
    }
}

int main() {
    int n;
    
    scanf("%d%d", &n, &c);
    
	for(int i = 0; i < n; i++) {
    	scanf("%d %s %d", &node[i].no, node[i].name, &node[i].score);
	}
    
	sort(node, node + n, cmp1);
    
	for(int i = 0; i < n; i++) {
		printf("%06d %s %d\n", node[i].no, node[i].name, node[i].score);
	}
    
	return 0;
}
```

## 1029 Median (25 分)

翻译：给出两个已排序序列，找出两个序列的中位数。

思路：two pointers，序列合并问题。书P139，练习册P181

答案：

```
#include <iostream>

using namespace std;
int k[200005];

int main(){
    int n, m, temp, count = 0;
    cin >> n; // 第一个序列的个数 
    for (int i = 1; i <= n; i++)
        scanf("%d", &k[i]); //输入第一个序列 
    k[n + 1] = 0x7fffffff;
    cin >> m; // 第二个序列的个数
    // 中间值位置 
    int midpos = (n + m + 1) / 2, i = 1;
    // 将第二个序列加入，two pointers i是第一个数组的指针，j是第二个数组的指针 
    for (int j = 1; j <= m; j++) {
        scanf("%d", &temp);
        while (k[i] < temp) {
            count++;
            if (count == midpos) cout << k[i];
            i++;
        }
        count++;
        if (count == midpos) cout << temp;
    }
    // 第二个数组读取完了，还没数到中间数
    while (i <= n) {
    	// 说明中间数在剩下的第一个数组中 
        count++;
        if (count == midpos) cout << k[i];
        i++;
    }
    return 0;
}
```

## 1030 **Travel Plan (30 分)

翻译：给出一张图，求出发点和结束点的最短路径，如果最短路径相同，选最短路费的一条。

思路：Dijksta + DFS。

十分典型的题，有Dijksta算法与DFS算法。自己做一遍

答案：

```
#include <cstdio>
#include <algorithm>
#include <vector>

using namespace std;

int n, m, s, d;
int e[510][510], dis[510], cost[510][510]; // 边，距离，路费 

vector<int> pre[510];
bool visit[510];
const int inf = 99999999;
vector<int> path, temppath;
int mincost = inf;

// 深度优先算法 
void dfs(int v) {
    temppath.push_back(v); // 向深处走 
    if(v == s) { // 从终点一直走到起点
    	// 计算总路费 
        int tempcost = 0;
        for(int i = temppath.size() - 1; i > 0; i--) {
            int id = temppath[i], nextid = temppath[i-1];
            tempcost += cost[id][nextid];
        }
        // 选取其中最少的路费 
        if(tempcost < mincost) {
            mincost = tempcost;
            path = temppath;
        }
        temppath.pop_back();
        return ;
    }
    for(int i = 0; i < pre[v].size(); i++) {
		dfs(pre[v][i]);
	}
    temppath.pop_back();
}

int main() {
    
	fill(e[0], e[0] + 510 * 510, inf);
    fill(dis, dis + 510, inf);
    scanf("%d%d%d%d", &n, &m, &s, &d); // 城市数量，边的数量，开始点，结束点
	 
	// 输入边与路费 
    for(int i = 0; i < m; i++) {
        int a, b;
        scanf("%d%d", &a, &b);
        scanf("%d", &e[a][b]);
        e[b][a] = e[a][b];
        scanf("%d", &cost[a][b]);
        cost[b][a] = cost[a][b];
    }
    
    // Dijksta算法开始 
    pre[s].push_back(s); // 先压入初始点 
    dis[s] = 0;
    for(int i = 0; i < n; i++) {
    	 
        int u = -1, minn = inf;
        // 选与当前集合距离最近的点，为u 
		for(int j = 0; j < n; j++) {
            if(visit[j] == false && dis[j] < minn) {
                u = j;
                minn = dis[j];
            }
        }
        if(u == -1) break;
        visit[u] = true; // 将选出的u设为已访问 
        for(int v = 0; v < n; v++) {
            if(visit[v] == false && e[u][v] != inf) {
                if(dis[v] > dis[u] + e[u][v]) { // 若u的加入使得距离变短，则更新最短路径 
                    dis[v] = dis[u] + e[u][v];
                    pre[v].clear();
                    pre[v].push_back(u);
                } else if(dis[v] == dis[u] + e[u][v]) { // 若相同，也压入路径 
                    pre[v].push_back(u);
                }
            }
        }
    }
    
    dfs(d);
    
    // 打印结果 
    for(int i = path.size() - 1; i >= 0; i--) {
		printf("%d ", path[i]);
	}
    printf("%d %d", dis[d], mincost);
    return 0;
}
```

## 1031 **Hello World for U (20 分)

翻译：将输入的字符串画成U形状，要求n1=n3，n2>=n1，n1尽可能的大。

思路：理解题意。均分为三份，多余的分配给n2。

典型题目，打印

答案：

```
#include <iostream>
#include <string.h>

using namespace std;

int main() {
    char c[81], u[30][30];
    memset(u, ' ', sizeof(u));
    
    scanf("%s", c);
    
	int n = strlen(c) + 2;
    
	int n1 = n / 3, n2 = n / 3 + n % 3, index = 0;
    
    // n1放在第一列 
	for(int i = 0; i < n1; i++) {
		u[i][0] = c[index++];
	}
	// n2放在最后一行 
    for(int i = 1; i <= n2 - 2; i++) {
		u[n1-1][i] = c[index++];
	}
	// n3放在最后一列 
    for(int i = n1 - 1; i >= 0; i--) {
		u[i][n2-1] = c[index++];
	}
	// 依次打印 
    for(int i = 0; i < n1; i++) {
        for(int j = 0; j < n2; j++) 
            printf("%c", u[i][j]);
        printf("\n");
    }
    return 0;
}
```

## 1032 **Sharing (25 分)

翻译：两个单词分享相同的结尾。

思路：先遍历第一个单词，再遍历第二个单词，初次遇到的相同的单词即为所求单词。

疑问：柳这种方式全面吗？

答：全面，因为字母可能相同，但是重合的尾巴的前驱地址肯定相同。

答案：

柳神的答案：

```
#include <cstdio>

using namespace std;

struct NODE {
    char key;
    int next;
    bool flag;
}node[100000];

int main() {

    int s1, s2, n, a, b;
    scanf("%d%d%d", &s1, &s2, &n);
    char data;

    for(int i = 0; i < n; i++) {
        scanf("%d %c %d", &a, &data, &b); // adress, data, next 
        node[a] = {data, b, false}; // key, next, flag
    }
	
	// 第一次全部标为true 
    for(int i = s1; i != -1; i = node[i].next) {
		node[i].flag = true;
	}
	
	// 第二次再次遇到同样的true，即为相同的起点 
    for(int i = s2; i != -1; i = node[i].next) {
        if(node[i].flag == true) {
            printf("%05d", i);
            return 0;
        }
    }
    printf("-1");
    return 0;
}
```

自己写的：

```
#include <cstdio>

using namespace std;

struct {
	char data;
	int next;
	bool flag;
} node[100000];

int main () {
	
	int start1, start2, n;
	
	scanf("%d %d %d", &start1, &start2, &n);
	
	for (int i = 0; i < n; i++) {
		int address, next;
		char data;
		scanf("%d %c %d", &address, &data, &next);
		node[address] = { data, next, false }; // 初始化 
	}
	
	// 第一次标记 
	for (int i = start1; i != -1; i = node[i].next) {
		node[i].flag = true;
	}
	
	for (int i = start2; i != -1; i = node[i].next) {
		if (node[i].flag == true) {
			printf("%05d", i);
			return 0;
		}
	}
	
	printf("-1");
	
	return 0;
} 
```

## 1033 **To Fill or Not to Fill (25 分)

翻译：选出最便宜的路径。Cmax油箱最大容量，D杭州到目标城市的距离，Davg每单位的油车可以跑的距离，N加油站的总数。下面跟着N行，每行分别是Pi每单位油的价格，Di这个车站和杭州的距离

思路：贪心算法。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;
const int inf = 99999999;

struct station {
    double price, dis;
};

bool cmp1(station a, station b) {
    return a.dis < b.dis;
}

int main() {
    double cmax, d, davg;
    int n;
    
    // Cmax油箱最大容量，D杭州到目标城市的距离，Davg每单位的油车可以跑的距离，N加油站的总数
    scanf("%lf%lf%lf%d", &cmax, &d, &davg, &n);
    
	vector<station> sta(n + 1);
    sta[0] = {0.0, d};
    
	for(int i = 1; i <= n; i++) {
		scanf("%lf%lf", &sta[i].price, &sta[i].dis);
	} 
    
    // 将车站按照距离从远到近排列 
    sort(sta.begin(), sta.end(), cmp1);
    
	double nowdis = 0.0, maxdis = 0.0, nowprice = 0.0, totalPrice = 0.0, leftdis = 0.0;
    if(sta[0].dis != 0) { // 出不了家门 
        printf("The maximum travel distance = 0.00");
        return 0;
    } else {
        nowprice = sta[0].price;
    }
    while(nowdis < d) { // 若还未到达终点 
        maxdis = nowdis + cmax * davg;
        double minPriceDis = 0, minPrice = inf;
        int flag = 0;
        
        // 遍历所有当前油量能到达的车站 
        for(int i = 1; i <= n && sta[i].dis <= maxdis; i++) {
            if(sta[i].dis <= nowdis) continue;
            if(sta[i].price < nowprice) { // 有比当前还低的第一个，直接加刚好到那个车站的油量 
                totalPrice += (sta[i].dis - nowdis - leftdis) * nowprice / davg;
                leftdis = 0.0;
                nowprice = sta[i].price;
                nowdis = sta[i].dis;
                flag = 1;
                break;
            }
            // 没有比当前还低的就找尽可能低的 
            if(sta[i].price < minPrice) {
                minPrice = sta[i].price;
                minPriceDis = sta[i].dis;
            }
        }
        
        // 找到了尽可能低的距离
        if(flag == 0 && minPrice != inf) {
            totalPrice += (nowprice * (cmax - leftdis / davg));
            leftdis = cmax * davg - (minPriceDis - nowdis);
            nowprice = minPrice;
            nowdis = minPriceDis;     
        }
        
        if(flag == 0 && minPrice == inf) {
            nowdis += cmax * davg;
            printf("The maximum travel distance = %.2f", nowdis);
            return 0;
        }
    }
    printf("%.2f", totalPrice);
    return 0;
}
```

## 1034 Head of a Gang (30 分)

翻译：超过两个人，通话的总次数超过阀值称为一个帮派，帮派中通话记录最多的为帮派老大。给你N条通话记录，问你有几个帮派，帮派老大分别是谁。

思路：用DFS计算连通分量，连通分量即为帮派的个数。在DFS中记录一个连通分量总的节点数以及权值最大的节点。

答案：

```
#include <iostream>
#include <map>

using namespace std;

map<string, int> stringToInt;
map<int, string> intToString;
map<string, int> ans;
int idNumber = 1, k;

// 名字记录 
int stoifunc(string s) {
    if(stringToInt[s] == 0) { // 若未储存过，存 
        stringToInt[s] = idNumber; // 名字查数字 
        intToString[idNumber] = s; // 数字查名字 
        return idNumber++; // 返回名字总数 
    } else { // 若已有记录，查 
        return stringToInt[s];
    }
}

int G[2010][2010], weight[2010];

bool vis[2010];

// 深度优先遍历 
void dfs(int u, int &head, int &numMember, int &totalweight) {
    vis[u] = true;
    numMember++; // 计算总人数 
    // 权值最大节点即为老大 
	if(weight[u] > weight[head]) {
		head = u;
	}
	// 继续遍历 
    for(int v = 1; v < idNumber; v++) {
        if(G[u][v] > 0) {
            totalweight += G[u][v]; // 将u相邻的边的权重记录 
            G[u][v] = G[v][u] = 0; // 已记录的权重置空 
            if(vis[v] == false) {
				dfs(v, head, numMember, totalweight);
			}
        }
    }
}

void dfsTrave() {
    for(int i = 1; i < idNumber; i++) {
        if(vis[i] == false) {
            int head = i, numMember = 0, totalweight = 0;
            dfs(i, head, numMember, totalweight);
            // 遍历完成，记录当前帮派的老大以及人数 
            if(numMember > 2 && totalweight > k)
                ans[intToString[head]] = numMember;
        }
    }
}

int main() {
    int n, w;
    cin >> n >> k; // 总通话数，阀值
    string s1, s2;
    for(int i = 0; i < n; i++) {
        cin >> s1 >> s2 >> w;
        int id1 = stoifunc(s1);
        int id2 = stoifunc(s2);
        // 节点权值 
        weight[id1] += w;
        weight[id2] += w;
        // 边权值 
		G[id1][id2] += w;
        G[id2][id1] += w;
    }
    
    dfsTrave();
    
	cout << ans.size() << endl; // ans的有记录的总数即为帮派的个数 
    for(auto it = ans.begin(); it != ans.end(); it++) {
		cout << it->first << " " << it->second << endl; // key为名字，value为帮派人数 
	} 
        
    return 0;
}

```

## 1035 Password (20 分)

翻译：将有可能混淆的密码用其他字符替代。

思路：边遍历字符串边替换即可。

答案：

```
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    scanf("%d", &n); // 密码的个数 
    vector<string> v;
    
	for(int i = 0; i < n; i++) {
        string name, s;
        cin >> name >> s; // 名字，密码 
        int len = s.length(), flag = 0;
        for(int j = 0; j < len; j++) {
            switch(s[j]) {
                case '1' : s[j] = '@'; flag = 1; break;
                case '0' : s[j] = '%'; flag = 1; break;
                case 'l' : s[j] = 'L'; flag = 1; break;
                case 'O' : s[j] = 'o'; flag = 1; break;
            }
        }
        if(flag) {
            string temp = name + " " + s;
            v.push_back(temp);
        }
    }
    int cnt = v.size();
    if(cnt != 0) {
        printf("%d\n", cnt);
        for(int i = 0; i < cnt; i++)
            cout << v[i] << endl;
    } else if(n == 1) {
        printf("There is 1 account and no account is modified");
    } else {
        printf("There are %d accounts and no account is modified", n);
    }
    return 0;
}
```

## 1036 Boys vs Girls (25 分)

翻译：求分数最高的男同学与分数最高的女同学的差。

思路：比较简单，按照题目意思求就可以了。

答案：

```
#include <iostream>

using namespace std;

int main() {
    
	int n;
    scanf("%d", &n); // 学生的总数 
    
	string female, male;
    int femalescore = -1, malescore = 101;
    for(int i = 0; i < n; i++) {
        string name, sex, num;
        int score;
        cin >> name >> sex >> num; 
        scanf("%d", &score);
        // 选出最大的女学生成绩与最小的男学生成绩 
        if(sex == "F") {
            if(femalescore < score) {
                femalescore = score;
                female = name + " " + num;
            }
        } else if(malescore > score) {
                malescore = score;
                male = name + " " + num;
            }
    }
    
    if(femalescore != -1)
        cout << female << endl;
    else
        printf("Absent\n");
        
    if(malescore != 101)
        cout << male << endl;
    else
        printf("Absent\n");
        
    if(femalescore != -1 && malescore != 101)
        printf("%d", femalescore - malescore);
    else
        printf("NA");
        
    return 0;
}
```

## 1037 Magic Coupon (25 分)

翻译：一堆的优惠券和一堆的商品，请你计算收回的最多的钱。

思路：贪心算法。负的优惠券用于负的商品会收钱。所以比较合理的是先将负的优惠券用于负的商品。

答案：

```
#include <cstdio>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int m, n, ans = 0, p = 0, q = 0;
    scanf("%d", &m); // 优惠券个数 
    vector<int> v1(m);
    for(int i = 0; i < m; i++)
        scanf("%d", &v1[i]);
    scanf("%d", &n); // 商品个数 
    vector<int> v2(n);
    for(int i = 0; i < n; i++)
        scanf("%d", &v2[i]);
    // 从小到大排序 
    sort(v1.begin(), v1.end());
    sort(v2.begin(), v2.end());
   	// 负的相乘求和，绝对值大的乘绝对值大的 
	while(p < m && q < n && v1[p] < 0 && v2[q] < 0) {
        ans += v1[p] * v2[q];
        p++; q++;
    }
    p = m - 1, q = n - 1;
    // 正的相乘求和，大的和大的乘 
    while(p >= 0 && q >= 0 && v1[p] > 0 && v2[q] > 0) {
        ans += v1[p] * v2[q];
        p--; q--;
    }
    printf("%d", ans);
    return 0;
}
```

## 1038 **Recover the Smallest Number (30 分)

翻译：给一组数，组成最小的数。

思路：奇淫巧技，在于cmp函数，按照数字的ASCII码顺序排列。

需要理解下这个原理

答案：

```
#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

bool cmp0(string a, string b) {
    return a + b < b + a;
}

string str[10010];

int main() {
    int n;
    scanf("%d", &n);
    for(int i = 0; i < n; i++)
        cin >> str[i];
    sort(str, str + n, cmp0);
    string s;
    for(int i = 0; i < n; i++)
        s += str[i];
    while(s.length() != 0 && s[0] == '0')
        s.erase(s.begin());
    if(s.length() == 0) cout << 0;
    cout << s;
    return 0;
}
```

## 1039 Course List for Student (25 分)

翻译：给出每个课程注册的学生的数据，之后给出学生求这个学生注册了哪些课程。

思路：考虑到string、cin、cout会超时，可以使用hash(26*26*26*10+10)将学生姓名变为int型，然后存储在vector里面。

答案：

```
#include <cstdio>
#include <vector>
#include <algorithm>

using namespace std;

// 将学生姓名变为int型 
int getid(char *name) {
    int id = 0;
    for(int i = 0; i < 3; i++)
        id = 26 * id + (name[i] - 'A');
    id = id * 10 + (name[3] - '0');
    return id;
}

const int maxn = 26 * 26 * 26 * 10 + 10;
vector<int> v[maxn];

int main() {
    int n, k, no, num, id = 0;
    char name[5];
    scanf("%d %d", &n, &k); // 查询课程学生的数量，课程的数量 
    for(int i = 0; i < k; i++) {
        scanf("%d %d", &no, &num); // 课程编号，此课程注册的学生数 
        for(int j = 0; j < num; j++) {
            scanf("%s", name); // 学生名字 
            id = getid(name);
            v[id].push_back(no); // 学生对应的课程 
        }
    }
    // 打印学生对应的课程 
    for(int i = 0; i < n; i++) {
        scanf("%s", name);
        id = getid(name);
        sort(v[id].begin(), v[id].end());
        printf("%s %lu", name, v[id].size());
        for(int j = 0; j < v[id].size(); j++)
            printf(" %d", v[id][j]);
        printf("\n");
    }
    return 0;
}
```

## 1040 **Longest Symmetric String (25 分)

翻译：给一个字符串，输出最长的对称子字符串的长度。

思路：动态规划。

算法笔记：P425动态规划专题   算法笔记实战指南P394 最长回文子串

答案：

```
#include <iostream>

using namespace std;

int dp[1010][1010];

int main() {
    string s;
    getline(cin, s);
    int len = s.length(), ans = 1;
    for(int i = 0; i < len; i++) {
        dp[i][i] = 1;
        if(i < len - 1 && s[i] == s[i+1]) {
            dp[i][i+1] = 1;
            ans = 2;
        }
    }
    for(int L = 3; L <= len; L++) {
        for(int i = 0; i + L - 1 < len; i++) {
            int j = i + L -1;
            if(s[i] == s[j] && dp[i+1][j-1] == 1) {
                dp[i][j] = 1;
                ans = L;
            }
        }
    }
    printf("%d", ans);
    return 0;
}
```

## 1041 Be Unique (20 分)

翻译：哪个只出现一次的数字即为我们需要的数字。

思路：理解题意，map功能。

答案：

```
#include <cstdio>

using namespace std;

int a[100001], m[100000];

int main() {
    int n;
    scanf("%d", &n); // n个数字 
    for(int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        m[a[i]]++;
    }
    for(int i = 0; i < n; i++) {
        if(m[a[i]] == 1) {
            printf("%d", a[i]);
            return 0;
        }
    }
    printf("None");
    return 0;
}
```

## 1042 Shuffling Machine (20 分)

翻译：洗牌机器将顺序的牌组打乱。

思路：按照给的数据简单模拟即可。

设置一个scan作为映射，并分别保留开始和结束的数列

答案：

```
#include <cstdio>

using namespace std;

int main() {
    int cnt;
    scanf("%d", &cnt); // 重复次数 
    int start[55], end[55], scan[55];
    for(int i = 1; i < 55; i++) {
        scanf("%d", &scan[i]);
        end[i] = i;
    }
    // 重复洗牌 
    for(int i = 0; i < cnt; i++) {
        for(int j = 1; j < 55; j++)
            start[j] = end[j];
        for(int k = 1; k < 55; k++)
            end[scan[k]] = start[k];
    }
    char c[6] = {"SHCDJ"};
    for(int i = 1; i < 55; i++) {
        end[i] = end[i] - 1;
        printf("%c%d", c[end[i]/13], end[i]%13+1);
        if(i != 54) printf(" ");
    }
    return 0;
}
```

## 1043 **Is It a Binary Search Tree (25 分)

翻译：检查一个序列是否是BST或者BST的镜像的先序遍历序列，如果是，输出该BST的后序遍历序列。

思路：BST的先序遍历，BST的后序遍历。

算法笔记实战指南P316

答案：

```
#include <cstdio>
#include <vector>

using namespace std;

bool isMirror;
vector<int> pre, post;

// 开头与结尾 
void getpost(int root, int tail) {
    if(root > tail) return ;
    int i = root + 1, j = tail;
    if(!isMirror) { // 不是镜像
    	// 左子树全部小于根，找到其结束的位置 
        while(i <= tail && pre[root] > pre[i]) i++;
        // 右子树全部大于根，找到其开始的位置
		while(j > root && pre[root] <= pre[j]) j--;
    } else { // 是镜像 
        while(i <= tail && pre[root] <= pre[i]) i++;
        while(j > root && pre[root] > pre[j]) j--;
    }
    if(i - j != 1) return ; // 若开始位置与结束的位置不相邻，返回
	// 遍历左子树 
    getpost(root + 1, j);
    // 遍历右子树 
	getpost(i, tail);
	// 后序遍历，LRN 
    post.push_back(pre[root]);
}

int main() {
	
    int n;
    scanf("%d", &n); // 序列长度 
    
	pre.resize(n);
    
	for(int i = 0; i < n; i++)
        scanf("%d", &pre[i]); // 先序序列（NLR）
    
    // 转化为后序LRN 
	getpost(0, n - 1);
	
	// 不为n，表明不是先序序列，转化为镜面试试 
    if(post.size() != n) {
        isMirror = true;
        post.clear();
        getpost(0, n - 1);
    }
    
    if(post.size() == n) {
        printf("YES\n%d", post[0]);
        for(int i = 1; i < n; i++)
            printf(" %d", post[i]);
    } else {
        printf("NO");
    }
    return 0;
}
```

## 1044 **Shopping in Mars (25 分)

翻译：火星人购物付钱用钻石，请你帮忙算如何取出合适的钻石。

思路：求一串的数字中连续的一段，使得这个连续的段内数字的和恰好等于所期望的值m。

没有完全理解，后面再理解下。

答案：

```
#include <iostream>
#include <vector>

using namespace std;

vector<int> sum, resultArr;
int n, m;

void Func(int i, int &j, int &tempsum) {
    int left = i, right = n;
    while(left < right) {
        int mid = (left + right) / 2;
        if(sum[mid] - sum[i-1] >= m)
            right = mid;
        else
            left = mid + 1;
    }
    j = right;
    tempsum = sum[j] - sum[i-1];
}

int main() {
    scanf("%d%d", &n, &m); // 钻石的个数，需要付的钻石的数量 
    sum.resize(n+1);
    for(int i = 1; i <= n; i++) {
        scanf("%d", &sum[i]);
        sum[i] += sum[i-1];
    }
    int minans = sum[n];
    for(int i = 1; i <= n; i++) {
        int j, tempsum;
        Func(i, j, tempsum);
        if(tempsum > minans) continue;
        if(tempsum >= m) {
            if(tempsum < minans) {
                resultArr.clear();
                minans = tempsum;
            }
            resultArr.push_back(i);
            resultArr.push_back(j);
        }
    }
    for(int i = 0; i < resultArr.size(); i += 2)
        printf("%d-%d\n", resultArr[i], resultArr[i+1]);
    return 0;
}
```

## 1045 **Favorite Color Stripe (30 分)

翻译：选择最长的一段喜欢的颜色

思路：动态规划。

答案：

```
#include <iostream>
#include <vector>
using namespace std;
int book[201], a[10001], dp[10001];
int main() {
    int n, m, x, l, num = 0, maxn = 0;
    scanf("%d %d", &n, &m);
    for(int i = 1; i <= m; i++) {
        scanf("%d", &x);
        book[x] = i;
    }
    scanf("%d", &l);
    for(int i = 0; i < l; i++) {
        scanf("%d", &x);
        if(book[x] >= 1)
            a[num++] = book[x];
    }
    for(int i = 0; i < num; i++) {
        dp[i] = 1;
        for(int j = 0; j < i; j++)
            if(a[i] >= a[j])
                dp[i] = max(dp[i], dp[j] + 1);
        maxn = max(dp[i], maxn);
    }
    printf("%d", maxn);
    return 0;
}
```

## 1046 Shortest Distance (20 分)

翻译：有一个带权值的环，求任意两个节点最短的距离

思路：简单模拟。

答案：

```
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    scanf("%d", &n);
    vector<int> dis(n + 1);
    int sum = 0, left, right, cnt;
    for(int i = 1; i <= n; i++) {
        int temp;
        scanf("%d", &temp);
        sum += temp;
        dis[i] = sum;
    }
    scanf("%d", &cnt);
    for(int i = 0; i < cnt; i++) {
        scanf("%d %d", &left, &right);
        if(left > right)
            swap(left, right);
        int temp = dis[right - 1] - dis[left - 1];
        printf("%d\n", min(temp, sum - temp));
    }
    return 0;
}
```

## 1047 Student List for Course (25 分)

翻译：给你每个学生的注册的课程，请你给出每个课程的注册的学生。

思路：map思想

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>
#include <string.h>

using namespace std;
char name[40010][5];
vector<int> course[2510];

bool cmp1(int a, int b) {
    return strcmp(name[a], name[b]) < 0;
}

int main() {
    int n, k;
    scanf("%d %d", &n, &k); // 学生人数，课程数量 
    for(int i = 0; i < n; i++) {
        int cnt, temp;
        scanf("%s %d", name[i], &cnt); // 学生名字，注册的课程数量 
        for(int j = 0; j < cnt; j++) {
            scanf("%d", &temp); // 课程 
            course[temp].push_back(i); // 课程push进学生 
        }
    }
    for(int i = 1; i <= k; i++) {
        printf("%d %d\n", i, course[i].size()); // 课程编号，课程学生人数 
        sort(course[i].begin(), course[i].end(), cmp1);
        for(int j = 0; j < course[i].size(); j++)
            printf("%s\n", name[course[i][j]]); // 打印学生名字 
    }
    return 0;
}
```

## 1048 Find Coins (25 分)

翻译：口袋有很多不同面值的硬币，对于某一个价格，只能用两个硬币正好付清，求哪两个硬币。

思路：从小到大，寻找是否能有数补上后等于m（商品的价格）。

用map标记其互补的那个是否存在

答案：

```
#include <iostream>

using namespace std;
int a[1001];

int main() {
    int n, m, temp;
    scanf("%d %d", &n, &m); // 硬币的数量，需要付的钱 
    for(int i = 0; i < n; i++) {
        scanf("%d", &temp); // 硬币币值 
        a[temp]++; // 记录每个数字出现的次数 
    }
    for(int i = 0; i < 1001; i++) {
        if(a[i]) {
            a[i]--;
            if(m > i && a[m-i]) { // i < m，并且m-i存在，即为所需要的那一对 
                printf("%d %d", i, m - i);
                return 0;
            }
            a[i]++;
        }
    }
    printf("No Solution");
    return 0;
}
```

## 1049 **Counting Ones (30 分)

翻译：给出一个数字n，求1~n的所有数字里面出现1的个数相加，比如1,10,11,12总共有5个1。

思路：找规律。

实战指南P198

答案：

```
#include <iostream>
using namespace std;
int main() {
    int n, left = 0, right = 0, a = 1, now = 1, ans = 0;
    scanf("%d", &n);
    while(n / a) {
        left = n / (a * 10), now = n / a % 10, right = n % a;
        if(now == 0) ans += left * a;
        else if(now == 1) ans += left * a + right + 1;
        else ans += (left + 1) * a;
        a = a * 10;
    }
    printf("%d", ans);
    return 0;
}
```

## 1050 String Subtraction (20 分)

翻译：在一段字符串中去除指定的字符。

思路：用hash记录指定的字符，相等的不输出即可。

答案：

```
#include <iostream>
#include <string>
#include <string.h>

using namespace std;
char s1[100000], s2[100000];

int main() {
    cin.getline(s1, 100000);
    cin.getline(s2, 100000);
    int lens1 = strlen(s1), lens2 = strlen(s2);
    bool flag[256] = {false};
    for(int i = 0; i < lens2; i++)
        flag[s2[i]] = true;
    for(int i = 0; i < lens1; i++) {
        if(!flag[s1[i]])
            printf("%c", s1[i]);
    }
    return 0;
}
```

## 1051 Pop Sequence (25 分)

翻译：M为栈的长度，按顺序输出N个数字，检测pop序列是否有可能。

思路：模拟栈的pop过程

答案：

```
#include <iostream>
#include <stack>
#include <vector>

using namespace std;

int main() {
    
	int m, n, k;
    scanf("%d %d %d", &m, &n, &k); // 栈的容量，序列的长度，序列的条数 
    
	for(int i = 0; i < k; i++) {
        bool flag = false;
        stack<int> s; // 申请一个栈 
        vector<int> v(n + 1);
        for(int j = 1; j <= n; j++)
            scanf("%d", &v[j]); // 序列 
        int current = 1;
        for(int j = 1; j <= n; j++) {
            s.push(j);
            if(s.size() > m) break; // 超过栈的容量 
            while(!s.empty() && s.top() == v[current]) { // 与pop序列相同，pop出来，并移动当前指针 
                s.pop();
                current++;
            }
        }
        if(current == n + 1) flag = true;
        if(flag) printf("YES\n");
        else printf("NO\n");
    }
    
	return 0;
}
```

## 1052 Linked List Sorting (25 分)

翻译：链表按照key从小到大排序，修改next

思路：

注意有可能有无效的节点，注意其处理方式。

return a.flag > b.flag // 意味着，flag为true的放在前面

直接将链表放到数组中，用sort排序，最后输出的时候有点技巧。

答案：

```
#include <iostream>
#include <algorithm>

using namespace std;

struct NODE {
    int address, key, next;
    bool flag;
}node[100000];

int cmp1(NODE a, NODE b) {
	// 无效的节点往后移，有效的节点按key从小到大排 
	// a.flag > b.flag意味着flag为true的放在前面 
    return !a.flag || !b.flag ? a.flag > b.flag : a.key < b.key;
}

int main() {
    int n, cnt = 0, s, a, b, c;
    scanf("%d%d", &n, &s); // 链的长度，首项的地址 
    for(int i = 0; i < n; i++) {
        scanf("%d%d%d", &a, &b, &c); // address, key, next
        node[a] = {a, b, c, false};
    }
    for(int i = s; i != -1; i = node[i].next) {
        node[i].flag = true; // 标记有效节点 
        cnt++;
    }
    if(cnt == 0) {
        printf("0 -1");
    } else {
    	// 排序完成 
        sort(node, node + 100000, cmp1);
        // 排序完成之后 
		printf("%d %05d\n", cnt, node[0].address); // 第一个节点的前两个数据 
        for(int i = 0; i < cnt; i++) {
            printf("%05d %d ", node[i].address, node[i].key);
            // 区分最后一个节点 
			if(i != cnt - 1)
                printf("%05d\n", node[i + 1].address);
            else
                printf("-1\n");
        }
    }
    return 0;
}
```

## 1053 **Path of Equal Weight (30 分)

翻译：给一棵树，给一个权值，查路径到叶结点权值之和为给定的权值的路径。

思路：

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;
int target;

struct NODE {
    int w;
    vector<int> child;
};

vector<NODE> v;
vector<int> path;

void dfs(int index, int nodeNum, int sum) {
    if(sum > target) return ;
    if(sum == target) {
        if(v[index].child.size() != 0) return;
        for(int i = 0; i < nodeNum; i++)
            printf("%d%c", v[path[i]].w, i != nodeNum - 1 ? ' ' : '\n');
        return ;
    }
    for(int i = 0; i < v[index].child.size(); i++) {
        int node = v[index].child[i];
        path[nodeNum] = node;
        dfs(node, nodeNum + 1, sum + v[node].w);
    }
    
}

int cmp1(int a, int b) {
    return v[a].w > v[b].w;
}

int main() {
    int n, m, node, k;
    scanf("%d %d %d", &n, &m, &target); // 总节点数，非叶子节点数，目标权值 
    v.resize(n), path.resize(n);
    for(int i = 0; i < n; i++)
        scanf("%d", &v[i].w); // 权值 
    for(int i = 0; i < m; i++) {
        scanf("%d %d", &node, &k);
        v[node].child.resize(k);
        for(int j = 0; j < k; j++)
            scanf("%d", &v[node].child[j]);
        sort(v[node].child.begin(), v[node].child.end(), cmp1);
    }
    dfs(0, 1, v[0].w);
    return 0;
}
```

## 1054 The Dominant Color (20 分)

翻译：在一个分辨率下，超过一半的颜色称为Dominant Color，给你数据，寻找这个颜色。

思路：map计数

答案：

```
#include <iostream>
#include <map>
using namespace std;
int main() {
    int m, n;
    scanf("%d %d", &m, &n); // 宽，高 
    map<int, int> arr;
    int half = m * n / 2;
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < m; j++) {
            int temp;
            scanf("%d", &temp);
            arr[temp]++; // 计数 
            if(arr[temp] > half) { // 超过一半 
                printf("%d", temp);
                return 0;
            }
        }
    }
    return 0;
}
```

## 1055 The World's Richest (25 分)

翻译：给很多人的数据，分别是名字，年龄，财富。然后给你一定的年龄范围，查符合范围的富豪。

思路：排序，筛选，注意性能。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>
#include <cstring>

using namespace std;

struct node {
    char name[10];
    int age, money;
};

// 排序 
int cmp1(node a, node b) {
    if(a.money != b.money)
        return a.money > b.money;
    else if(a.age != b.age)
        return a.age < b.age;
    else
        return (strcmp(a.name, b.name) < 0);
}

int main() {
    int n, k, num, amin, amax;
    scanf("%d %d", &n, &k); // 富豪人数，查询个数 
    vector<node> vt(n), v;
    vector<int> book(205, 0);
    for(int i = 0; i < n; i++)
        scanf("%s %d %d", vt[i].name, &vt[i].age, &vt[i].money); // 名字，年龄，财富 
    sort(vt.begin(), vt.end(), cmp1);
    for(int i = 0; i < n; i++) {
        if(book[vt[i].age] < 100) { // 只取每个年龄的前100名 
            v.push_back(vt[i]); // 压入新数组 
            book[vt[i].age]++; // 统计每个年龄对应的人数 
        }
    }
    for(int i = 0; i < k; i++) {
        scanf("%d %d %d", &num, &amin, &amax); // 个数，最小年龄，最大年龄 
        vector<node> t; // 储存当前这个查询，符合的人 
        for(int j = 0; j < v.size(); j++) {
            if(v[j].age >= amin && v[j].age <= amax)
                t.push_back(v[j]); // 符合年龄区间的压入t 
        }
        if(i != 0) printf("\n");
        printf("Case #%d:", i + 1);
        int flag = 0;
        for(int j = 0; j < num && j < t.size(); j++) {
            printf("\n%s %d %d", t[j].name, t[j].age, t[j].money);
            flag = 1;
        }
        if(flag == 0) printf("\nNone");
    }
    return 0;
}
```

## 1056 **Mice and Rice (25 分)

翻译：

思路：

没看懂。

答案：

```
#include <iostream>
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;
struct node {
    int weight, index, rank, index0;
};
bool cmp1(node a, node b) {
    return a.index0 < b.index0;
}
int main() {
    int n, g, num;
    scanf("%d%d", &n, &g);
    vector<int> v(n);
    vector<node> w(n);
    for(int i = 0; i < n; i++)
        scanf("%d", &v[i]);
    for(int i = 0; i < n; i++) {
        scanf("%d", &num);
        w[i].weight = v[num];
        w[i].index = i;
        w[i].index0 = num;
    }
    queue<node> q;
    for(int i = 0; i < n; i++)
        q.push(w[i]);
    while(!q.empty()) {
        int size = q.size();
        if(size == 1) {
            node temp = q.front();
            w[temp.index].rank = 1;
            break;
        }
        int group = size / g;
        if(size % g != 0)
            group += 1;
        node maxnode;
        int maxn = -1, cnt = 0;
        for(int i = 0; i < size; i++) {
            node temp = q.front();
            w[temp.index].rank = group + 1;
            q.pop();
            cnt++;
            if(temp.weight > maxn) {
                maxn = temp.weight;
                maxnode = temp;
            }
            if(cnt == g || i == size - 1) {
                cnt = 0;
                maxn = -1;
                q.push(maxnode);
            }
        }
    }
    sort(w.begin(), w.end(), cmp1);
    for(int i = 0; i < n; i++) {
        if(i != 0) printf(" ");
        printf("%d", w[i].rank);
    }
    return 0;
}
```

## 1057 Stack (30 分)

翻译：

思路：树状数组？？？

树状数组是什么？

答案：

```
#include <iostream>
#include <stack>
#define lowbit(i) ((i) & (-i))

const int maxn = 100010;
using namespace std;
int c[maxn];
stack<int> s;

void update(int x, int v) {
    for(int i = x; i < maxn; i += lowbit(i))
        c[i] += v;
}

int getsum(int x) {
    int sum = 0;
    for(int i = x; i >= 1; i -= lowbit(i))
        sum += c[i];
    return sum;
}

void PeekMedian() {
    int left = 1, right = maxn, mid, k = (s.size() + 1) / 2;
    while(left < right) {
        mid = (left + right) / 2;
        if(getsum(mid) >= k)
            right = mid;
        else
            left = mid + 1;
    }
    printf("%d\n", left);
}

int main() {
    int n, temp;
    scanf("%d", &n); // n个指令 
    char str[15];
    for(int i = 0; i < n; i++) {
        scanf("%s", str); // 指令 
        if(str[1] == 'u') { // psuh指令 
            scanf("%d", &temp);
            s.push(temp);
            update(temp, 1);
        } else if(str[1] == 'o') { // pop指令
            if(!s.empty()) {
                update(s.top(), -1);
                printf("%d\n", s.top());
                s.pop();
            } else {
                printf("Invalid\n");
            }
        } else { // PeekMedian指令
            if(!s.empty())
                PeekMedian();
            else
                printf("Invalid\n");
        }
    }
    return 0;
}
```

## 1058 A+B in Hogwarts (20 分)

翻译：哈利波特中的货币系统，29个Knuts为一个Sickle，17个Sickles为一个Galleon。用这种方式计算A+B。

思路：全部转化为Knuts之后相加，再转化为需要的形式。

答案：

```
#include <iostream>

using namespace std;

int main() {
	
    long long a, b, c, d, e, f;
    scanf("%lld.%lld.%lld %lld.%lld.%lld", &a, &b, &c, &d, &e, &f);
    
	long long num = c + b * 29 + a * 29 * 17 + f + e * 29 + d * 29 * 17; // 全部转化为最低的单位相加 
	
    long long g = num / (17 * 29);
    num = num % (17 * 29);
    printf("%lld.%lld.%lld", g, num / 29, num % 29);
    
    return 0;
}
```

## 1059 Prime Factors (25 分)

翻译：给一个数，算出它的素数的分解。

思路：将这个数依次除以素数表的素数，从小到大，计算每个素数除的次数。

答案：

```
#include <cstdio>
#include <vector>

using namespace std;
vector<int> prime(500000, 1);

int main() {
	// 建立素数表，即prime[] = 1的为素数，即不是由相乘得到的即为素数。 
    for(int i = 2; i * i < 500000; i++)
        for(int j = 2; j * i < 500000; j++)
            prime[j * i] = 0;
            
    long int a;
    scanf("%ld", &a); // 需要分解的数 
    
    printf("%ld=", a);
    
    if(a == 1) printf("1");
    bool state = false;
    
	for(int i = 2; a >= 2;i++) {
        int cnt = 0, flag = 0;
        // 一直除当前的素数，直到除不净为止 
        while(prime[i] == 1 && a % i == 0) {
            cnt++; // 记录当前素数除的次数 
            a = a / i;
            flag = 1;
        }
        // flag表示当前是否有能除净的素数 
        if(flag) {
            if(state) printf("*");
            printf("%d", i);
            state = true;
        }
        // cnt表示素数的重复次数 
        if(cnt >= 2)
            printf("^%d", cnt);
    }
    
	return 0;
}
```

## 1060 **Are They Equal (25 分)

翻译：12300与12358.9在保留三位的科学计数法眼中是一样的，都是0.123×10^5。你需要告诉我们，两个数在某个位数的科学计数法下是否是一样的。

思路：科学计数法。

科学计数法为一类题目。

答案：

```
#include <iostream>
#include <cstring>

using namespace std;

int main() {
    int n, p = 0, q = 0;
    char a[10000], b[10000], A[10000], B[10000];

    scanf("%d%s%s", &n, a, b); // 有效数字，a数，b数 
	
	// 寻找a与b"."的位置 
    int cnta = strlen(a), cntb = strlen(b);
    for(int i = 0; i < strlen(a); i++) {
        if(a[i] == '.') {
            cnta = i;
            break;
        }
    }
    for(int i = 0; i < strlen(b); i++) {
        if(b[i] == '.') {
            cntb = i;
            break;
        }
    }
    
    // 考虑到可能前面有多余的零，用 p 和 q 通过扫描字符串使 p q 开始于第一个非0（且非小数点）处的下标
	// 即有效数字的开头 
    int indexa = 0, indexb = 0;
    while(a[p] == '0' || a[p] == '.') p++;
    while(b[q] == '0' || b[q] == '.') q++;
    
    // 小数点在第一个有效数字的左边还是右边 
    if (cnta >= p) {
    	cnta = cnta - p;
	}
    else {
    	cnta = cnta - p + 1;
	}
    // 小数点在第一个有效数字的左边还是右边 
    if(cntb >= q) {
    	cntb = cntb - q;
	}
    else {
    	cntb = cntb - q + 1;
	}
    // 字符串是0的情况 
    if(p == strlen(a))
        cnta = 0;
    if(q == strlen(b))
        cntb = 0;
    
    
    while(indexa < n) {
        if(a[p] != '.' && p < strlen(a))
            A[indexa++] = a[p]; // 按原有顺序排列 
        else if(p >= strlen(a))
            A[indexa++] = '0'; // 补零 
        p++;
    }
    while(indexb < n) {
        if(b[q] != '.' && q < strlen(b))
            B[indexb++] = b[q]; // 按原有顺序排列
        else if(q >= strlen(b))
            B[indexb++] = '0'; // 补零
        q++;
    }
    
    // strcmp：若str1=str2，则返回零；若str1<str2，则返回负数；若str1>str2，则返回正数
    if(strcmp(A, B) == 0 && cnta == cntb)
        printf("YES 0.%s*10^%d", A, cnta);
    else
        printf("NO 0.%s*10^%d 0.%s*10^%d" , A, cnta, B, cntb);
    return 0;
}
```

## 1061 Dating (20 分)

翻译：解密约会的时间。前两个字符串，第一个重复的为D，代表一周的第四天，第二个重复为E，代表一天的第14个小时，后两个重复的为s，在4的位置上，代表第4分钟。

思路：读懂题目，按照题意解即可。

答案：

```
#include <iostream>
#include <cctype>

using namespace std;

int main() {
    string a, b, c, d;
    cin >> a >> b >> c >> d; // 四个字符串 
    char t[2];
    int pos, i = 0, j = 0;
    // 前两个字符串相同的第一个字符 
    while(i < a.length() && i < b.length()) {
        if (a[i] == b[i] && (a[i] >= 'A' && a[i] <= 'G')) {
            t[0] = a[i];
            break;
        }
        i++;
    }
    i = i + 1;
    // 前两个字符串相同的第二个字符，数字或者A到N 
	while (i < a.length() && i < b.length()) {
        if (a[i] == b[i] && ((a[i] >= 'A' && a[i] <= 'N') || isdigit(a[i]))) {
            t[1] = a[i];
            break;
        }
        i++;
    }
    // 后两个字符串相同的字母的位置 
    while (j < c.length() && j < d.length()) {
        if (c[j] == d[j] && isalpha(c[j])) {
            pos = j;
            break;
        }
        j++;
    }
    string week[7] = {"MON ", "TUE ", "WED ", "THU ", "FRI ", "SAT ", "SUN "};
    int m = isdigit(t[1]) ? t[1] - '0' : t[1] - 'A' + 10;
    cout << week[t[0]-'A']; // 打印星期 
    printf("%02d:%02d", m, pos); // 打印小时与分钟 
    return 0;
}
```

## 1062 Talent and Virtue (25 分)

翻译：分为五类，1.德才兼备 2. 德胜才 3. 才德兼亡，但尚有德胜才 4. 才德兼亡 5. 不及格，无法进入名单。每个分级别的排序，排序先按照总分排序，然后按照德分排序，最后按照才分排序。

思路：读懂题目，先分类，后排序。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

struct node {
    int num, de, cai;
};

// 排序 // 排序先按照总分排序，然后按照德分排序，最后按照才分排序 
int cmp(struct node a, struct node b) {
    if ((a.de + a.cai) != (b.de + b.cai))
        return (a.de + a.cai) > (b.de + b.cai);
    else if (a.de != b.de)
        return a.de > b.de;
    else
        return a.num < b.num;
}

int main() {
    int n, low, high;
    scanf("%d %d %d", &n, &low, &high);
    vector<node> v[4];
    node temp;
    int total = n;
    for (int i = 0; i < n; i++) {
        scanf("%d %d %d", &temp.num, &temp.de, &temp.cai);
        if (temp.de < low || temp.cai < low) // 德才的最低线 
            total--;
        else if (temp.de >= high && temp.cai >= high) // 德才兼备 
            v[0].push_back(temp);
        else if (temp.de >= high && temp.cai < high) // 德胜才 
            v[1].push_back(temp);
        else if (temp.de < high && temp.cai < high && temp.de >= temp.cai) // 才德兼亡，但尚有德胜才
            v[2].push_back(temp);
        else // 才德兼亡
            v[3].push_back(temp);
    }
    printf("%d\n", total);
    for (int i = 0; i < 4; i++) {
        sort(v[i].begin(), v[i].end(), cmp); // 在每个分类的内部，再排序 
        for (int j = 0; j < v[i].size(); j++)
            printf("%d %d %d\n", v[i][j].num, v[i][j].de, v[i][j].cai);
    }
    return 0;
}
```

## 1063 Set Similarity (25 分)

翻译：nc是两个集合的公共元素个数，nt是两个集合的所有包含的元素个数。查询不同set之间的相似度。

思路：理解题意，按题意即可。

答案：

```
#include <cstdio>
#include <vector>
#include <set>

using namespace std;

int main() {
	
    int n, m, k, temp, a, b;
    scanf("%d", &n); // n个set 
    vector<set<int>> v(n);
    
	for(int i = 0; i < n; i++) {
        scanf("%d", &m); // set有m个元素 
        set<int> s;
        for(int j = 0; j < m; j++) {
            scanf("%d", &temp);
            s.insert(temp);
        }
        v[i] = s;
    }
    scanf("%d", &k); // k个查询 
    for(int i = 0; i < k; i++) {
        scanf("%d %d", &a, &b); // 查哪两个set的相似度 
        int nc = 0, nt = v[b-1].size();
        for(auto it = v[a-1].begin(); it != v[a-1].end(); it++) {
            if(v[b-1].find(*it) == v[b-1].end()) // 是否有相同的 
                nt++;
            else
                nc++;
        }
        double ans = (double)nc / nt * 100;
        printf("%.1f%%\n", ans);
    }
    return 0;
}
```

## 1064 **Complete Binary Search Tree (30 分)

翻译：给一串构成树的序列，已知该树是完全二叉搜索树，求它的层序遍历的序列

思路：

通过一个完全二叉搜索树的中序序列，求出其层序序列

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;
vector<int> in, level;

void levelorder(int start, int end, int index) {
    if(start > end) return ;
    int n = end - start + 1;
    int l = log(n + 1) / log(2); // 除了最后一层的层数（深度h） 
    int leave = n - (pow(2, l) - 1);// 最后一层的叶子节点数（n - (2^h - 1)） 
    /* 
		pow(2, l - 1) - 1是除了root结点所在层和最后一层外，左子树的结点个数，
		pow(2, l - 1) 是l+1层最多拥有的属于根结点左子树的结点个数，
		min(pow(2, l - 1), leave)是最后一个结点真正拥有的属于根结点左子树上的结点个数
    */
	int root = start + (pow(2, l - 1) - 1) + min((int)pow(2, l - 1), leave); // 得到整个的左子树部分 
    level[index] = in[root];
    levelorder(start, root - 1, 2 * index + 1); // 左子树递归 
    levelorder(root + 1, end, 2 * index + 2); // 右子树递归 
}

int main() {
	
    int n;
    scanf("%d", &n); // 节点个数 
    
	in.resize(n);
    level.resize(n);
    
	for(int i = 0 ; i < n; i++) {
		scanf("%d", &in[i]); // 输入序列 
	}
    
    // BST的中序序列为递增序列 
	sort(in.begin(), in.end());
	
    levelorder(0, n - 1, 0);
    
    printf("%d", level[0]);
    for(int i = 1; i < n; i++)
        printf(" %d", level[i]);
    return 0;
}
```

## 1065 **A+B and C (64bit) (20 分)

翻译：判断A+B是否大于C

思路：sum有可能溢出。

自己试一下

答案：

```
#include <cstdio>
 
using namespace std;

int main() {
    int n;
    scanf("%d", &n); 
    for(int i = 0; i < n; i++) {
        long long a, b, c;
        scanf("%lld %lld %lld", &a, &b, &c);
        long long sum = a + b;
        if(a > 0 && b > 0 && sum < 0) {
            printf("Case #%d: true\n", i + 1);
        } else if(a < 0 && b < 0 && sum >= 0){
            printf("Case #%d: false\n", i + 1);
        } else if(sum > c) {
            printf("Case #%d: true\n", i + 1);
        } else {
            printf("Case #%d: false\n", i + 1);
        }
    }
    return 0;
}
```

## 1066 **Root of AVL Tree (25 分)

翻译：给出一系列的值，作为AVL树插入，最后给出AVL的根节点。

思路：AVL的模板代码带入，十分典型的题目。

AVL树典型题目。

答案：

```
#include <iostream>
using namespace std;
struct node {
    int val;
    struct node *left, *right;
};
node *rotateLeft(node *root) {
    node *t = root->right;
    root->right = t->left;
    t->left = root;
    return t;
}
node *rotateRight(node *root) {
    node *t = root->left;
    root->left = t->right;
    t->right = root;
    return t;
}
node *rotateLeftRight(node *root) {
    root->left = rotateLeft(root->left);
    return rotateRight(root);
}
node *rotateRightLeft(node *root) {
    root->right = rotateRight(root->right);
    return rotateLeft(root);
}
int getHeight(node *root) {
    if(root == NULL) return 0;
    return max(getHeight(root->left), getHeight(root->right)) + 1;
}
node *insert(node *root, int val) {
    if(root == NULL) {
        root = new node();
        root->val = val;
        root->left = root->right = NULL;
    } else if(val < root->val) {
        root->left = insert(root->left, val);
        if(getHeight(root->left) - getHeight(root->right) == 2)
            root = val < root->left->val ? rotateRight(root) : rotateLeftRight(root);
    } else {
        root->right = insert(root->right, val);
        if(getHeight(root->left) - getHeight(root->right) == -2)
            root = val > root->right->val ? rotateLeft(root) : rotateRightLeft(root);
    }
    return root;
}
int main() {
    int n, val;
    scanf("%d", &n);
    node *root = NULL;
    for(int i = 0; i < n; i++) {
        scanf("%d", &val);
        root = insert(root, val);
    }
    printf("%d", root->val);
    return 0;
}
```

## 1067 **Sort with Swap(0, i) (25 分)

翻译：只用Swap(0, i)做排序。

思路：贪心算法。

理解贪心算法。

答案：

```
#include <iostream>

using namespace std;

int main() {
	
    int n, t, cnt = 0, a[100010];
    cin >> n; // n个数字 
    
	for(int i = 0; i < n; i++){
    	cin >> t; 
    	a[t] = i; 
    }
    
	for(int i = 1; i < n; i++) {
        if(i != a[i]) {
            while(a[0] != 0) {
                swap(a[0],a[a[0]]);
                cnt++;
            }
            if(i != a[i]) {
                swap(a[0],a[i]);
                cnt++;
            }
        }
    }
    
    cout << cnt;
    
	return 0;
}
```

## 1068 **Find More Coins (30 分)

翻译：与1048Find Coins (25 分)做对比，区别为本题不是用两个硬币，而是用不定数的硬币，本题更难。

思路：动态规划，01背包问题。

算法笔记上机实战指南。P396 背包问题

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int dp[10010], w[10010];
bool choice[10010][110];
int cmp1(int a, int b){return a > b;}
int main() {
    int n, m;
    scanf("%d%d", &n, &m);
    for(int i = 1; i <= n; i++)
        scanf("%d", &w[i]);
    sort(w + 1, w + n + 1, cmp1);
    for(int i = 1; i <= n; i++) {
        for(int j = m; j >= w[i]; j--) {
            if(dp[j] <= dp[j-w[i]] + w[i]) {
                choice[i][j] = true;
                dp[j] = dp[j-w[i]] + w[i];
            }
        }
    }
    if(dp[m] != m) printf("No Solution");
    else {
        vector<int> arr;
        int v = m, index = n;
        while(v > 0) {
            if(choice[index][v] == true) {
                arr.push_back(w[index]);
                v -= w[index];
            }
            index--;
        }
        for(int i = 0; i < arr.size(); i++) {
            if(i != 0) printf(" ");
            printf("%d", arr[i]);
        }
    }
    return 0;
}
```

## 1069 The Black Hole of Numbers (20 分)

翻译：数字黑洞，最后为6174。

思路：简单模拟，按照题目说的做即可。

注意string与int的转化，与int与string的转化。

答案：

```
#include <iostream>
#include <algorithm>

using namespace std;

bool cmp(char a, char b) {
	return a > b; // 大的排前面 
}

int main() {
	
    string s;
    cin >> s;
    
	s.insert(0, 4 - s.length(), '0'); // 不满四的补0 
    
	do {
        string a = s, b = s;
        sort(a.begin(), a.end(), cmp);
        sort(b.begin(), b.end());
        int result = stoi(a) - stoi(b);
        s = to_string(result);
        s.insert(0, 4 - s.length(), '0'); // 不满四的补0
        cout << a << " - " << b << " = " << s << endl;
    } while (s != "6174" && s != "0000");
    return 0;
}
```

## 1070 Mooncake (25 分)

翻译：给出几种不同的月饼的数据，问最好的排列方式。

思路：先算单价，单价最高的现卖，依次再卖单价低的。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

struct mooncake{
    float mount, price, unit;
};

int cmp(mooncake a, mooncake b) {
    return a.unit > b.unit; // 单价高的排在前面 
}

int main() {

    int n, need;
    cin >> n >> need; // 月饼种类数，月饼市场需求 

    vector<mooncake> a(n);
    for (int i = 0; i < n; i++) scanf("%f", &a[i].mount); // 库存 
    for (int i = 0; i < n; i++) scanf("%f", &a[i].price); // 总售价 
    for (int i = 0; i < n; i++) a[i].unit = a[i].price / a[i].mount; // 算出单价 
    sort(a.begin(), a.end(), cmp); // 单价由高到低排列 
    
    float result = 0.0;
    for (int i = 0; i < n; i++) {
        if (a[i].mount <= need) { // 单价高的先全部卖出去 
            result = result + a[i].price;
        } else { // 单价高的全部卖出去之后，再卖单价低的，使利润最大化 
            result = result + a[i].unit * need;
            break;
        }
        need = need - a[i].mount;
    }
    
    printf("%.2f",result);
    return 0;
}
```

## 1071 Speech Patterns (25 分)

翻译：辨别一段话重复的单词，单词对大小写不敏感。

思路：map统计，string作为map的key

答案：

```
#include <iostream>
#include <map>
#include <cctype>

using namespace std;

int main() {
    string s, t;
   
    getline(cin, s);
    map<string, int> m;
   
    for(int i = 0; i < s.length(); i++) {
        if(isalnum(s[i])) { // [0-9 A-Z a-z]之中 
            s[i] = tolower(s[i]);
            t += s[i];
        }
        
        if(!isalnum(s[i]) || i == s.length() - 1){ // 遇到标点空格或结束 
            if(t.length() != 0) m[t]++; // 单词标记 
            t = ""; // 标记后清空 
        }
    }
    int maxn = 0;
    // 寻找用的最多的词 
    for(auto it = m.begin(); it != m.end(); it++) {
        if(it->second > maxn) {
            t = it->first;
            maxn = it->second;
        }
    }
    cout << t << " " << maxn;
    return 0;
}
```

## 1072 **Gas Station (30 分)

翻译：加油站要离车站最近，要离居民房子最远，求推荐的加油站位置。

思路：Dijkstra计算最短路径

答案：

```
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;
const int inf = 999999999;
int n, m, k, ds, station;
int e[1020][1020], dis[1020];
bool visit[1020];
int main() {
    fill(e[0], e[0] + 1020 * 1020, inf);
    fill(dis, dis + 1020, inf);
    scanf("%d%d%d%d", &n, &m, &k, &ds);
    for(int i = 0; i < k; i++) {
        int tempdis;
        string s, t;
        cin >> s >> t >> tempdis;
        int a, b;
        if(s[0] == 'G') {
            s = s.substr(1);
            a = n + stoi(s);
        } else {
            a = stoi(s);
        }
        if(t[0] == 'G') {
            t = t.substr(1);
            b = n + stoi(t);
        } else {
            b = stoi(t);
        }
        e[a][b] = e[b][a] = tempdis;
    }
    int ansid = -1;
    double ansdis = -1, ansaver = inf;
    for(int index = n + 1; index <= n + m; index++) {
        double mindis = inf, aver = 0;
        fill(dis, dis + 1020, inf);
        fill(visit, visit + 1020, false);
        dis[index] = 0;
        for(int i = 0; i < n + m; i++) {
            int u = -1, minn = inf;
            for(int j = 1; j <= n + m; j++) {
                if(visit[j] == false && dis[j] < minn) {
                    u = j;
                    minn = dis[j];
                }
            }
            if(u == -1) break;
            visit[u] = true;
            for(int v = 1; v <= n + m; v++) {
                if(visit[v] == false && dis[v] > dis[u] + e[u][v])
                    dis[v] = dis[u] + e[u][v];
            }
        }
        for(int i = 1; i <= n; i++) {
            if(dis[i] > ds) {
                mindis = -1;
                break;
            }
            if(dis[i] < mindis) mindis = dis[i];
            aver += 1.0 * dis[i];
        }
        if(mindis == -1) continue;
        aver = aver / n;
        if(mindis > ansdis) {
            ansid = index;
            ansdis = mindis;
            ansaver = aver;
        } else if(mindis == ansdis && aver < ansaver) {
            ansid = index;
            ansaver = aver;
        }
    }
    if(ansid == -1)
        printf("No Solution");
    else
        printf("G%d\n%.1f %.1f", ansid - n, ansdis, ansaver);
    return 0;
}
```

## 1073 **Scientific Notation (20 分)

翻译：

思路：科学计数法转化为普通数字法

科学计数法应该算一类题型

答案：

```
#include <iostream>
using namespace std;
int main() {
    string s;
    cin >> s;
    int i = 0;
    while (s[i] != 'E') i++;
    string t = s.substr(1, i-1);
    int n = stoi(s.substr(i+1));
    if (s[0] == '-') cout << "-";
    if (n < 0) {
        cout << "0.";
        for (int j = 0; j < abs(n) - 1; j++) cout << '0';
        for (int j = 0; j < t.length(); j++)
            if (t[j] != '.') cout << t[j];
    } else {
        cout << t[0];
        int cnt, j;
        for (j = 2, cnt = 0; j < t.length() && cnt < n; j++, cnt++) cout << t[j];
        if (j == t.length()) {
            for (int k = 0; k < n - cnt; k++) cout << '0';
        } else {
            cout << '.';
            for (int k = j; k < t.length(); k++) cout << t[k];
        }
    }
    return 0;
}
```

## 1074 Reversing Linked List (25 分)

翻译：将一个给的链表翻转。

思路：题1052为将链表从小到大排序。可以将这两题放到一起看。

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

## 1075 PAT Judge (25 分)

翻译：给出PAT提交列表，计算最终的排名。

思路：排序问题，利用结构体+sort。

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct node {
    int rank, id, total = 0;
    vector<int> score;
    int passnum = 0; // 完整通过的题目个数 
    bool isshown = false; // 用户有一题通过了编译器 
};

bool cmp1(node a, node b) {
    if(a.total != b.total)
        return a.total > b.total;
    else if(a.passnum != b.passnum)
        return a.passnum > b.passnum;
    else
        return a.id < b.id;
}

int main() {
    int n, k, m, id, num, score;
    scanf("%d %d %d", &n, &k, &m);
    vector<node> v(n + 1);
    for(int i = 1; i <= n; i++)
        v[i].score.resize(k + 1, -1);
    vector<int> full(k + 1);
    for(int i = 1; i <= k; i++)
        scanf("%d", &full[i]);
    for(int i = 0; i < m; i++) {
        scanf("%d %d %d", &id, &num, &score);
        v[id].id = id;
        v[id].score[num] = max(v[id].score[num], score);
        if(score != -1)
            v[id].isshown = true;
        else if(v[id].score[num] == -1)
            v[id].score[num] = -2;
    }
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= k; j++) {
            if(v[i].score[j] != -1 && v[i].score[j] != -2)
                v[i].total += v[i].score[j];
            if(v[i].score[j] == full[j])
                v[i].passnum++;
        }
    }
    sort(v.begin() + 1, v.end(), cmp1);
    for(int i = 1; i <= n; i++) {
        v[i].rank = i;
        if(i != 1 && v[i].total == v[i - 1].total)
            v[i].rank = v[i - 1].rank;
    }
    for(int i = 1; i <= n; i++) {
        if(v[i].isshown == true) {
            printf("%d %05d %d", v[i].rank, v[i].id, v[i].total);
            for(int j = 1; j <= k; j++) {
                if(v[i].score[j] != -1 && v[i].score[j] != -2)
                    printf(" %d", v[i].score[j]);
                else if(v[i].score[j] == -1)
                    printf(" -");
                else
                    printf(" 0");
            }
            printf("\n");
        }
    }
    return 0;
}
```

## 1076 **Forwards on Weibo (30 分)

翻译：微博的转发通过一定层数后最多能多少转发。

思路：比较明显的广度优先的问题，即六度空间的问题，用bfs算法。

答案：

```
#include <cstdio>
#include <queue>
#include <vector>

using namespace std;
int n, l, m, k;

struct node {
    int id, layer;
};
vector<vector<int>> v;

// bfs算法 
int bfs(node tnode) {
    bool inq[1010] = {false};
    queue<node> q;
    q.push(tnode);
    inq[tnode.id] = true;
    int cnt = 0;
    while(!q.empty()) {
        node top = q.front(); // 队列中取一个出来 
        q.pop();
        int topid = top.id;
        for(int i = 0; i < v[topid].size(); i++) {
            int nextid = v[topid][i]; // topid的关注者 
            if(inq[nextid] == false && top.layer < l) {
                node next = {nextid, top.layer + 1};
                q.push(next);
                inq[next.id] = true;
                cnt++;
            }
        }
    }
    return cnt;
}

int main() {
    scanf("%d %d", &n, &l); // 用户人数，几层 
    v.resize(n + 1);
    for(int i = 1; i <= n; i++) {
        scanf("%d", &m);
        for(int j = 0; j < m; j++) {
            int temp;
            scanf("%d", &temp); // 被i关注的人 
            v[temp].push_back(i);
        }
    }
    scanf("%d", &k);
    int tid;
    for(int i = 0; i < k; i++) {
        scanf("%d", &tid); // 从tid开始转发 
        node tnode = {tid, 0}; // id，layer 
        printf("%d\n", bfs(tnode));
    }
    return 0;
}
```

## 1077 Kuchiguse (20 分)

翻译：求几句话中相同的日语语气词

思路：

即求相同的后缀

翻转字符串求相同的字符片段

答案：

```
#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    int n;
    scanf("%d\n", &n); // n句话 
    string ans;
    for(int i = 0; i < n; i++) {
        string s;
        getline(cin, s);
        int lens = s.length();
        reverse(s.begin(), s.end()); // 翻转 
        if(i == 0) {
            ans = s;
            continue;
        } else {
            int lenans = ans.length();
            if(lens < lenans) swap(ans, s);
            int minlen = min(lens, lenans); // 长度为两个中短的那个
			// 求两句话相同的前缀 
            for(int j = 0; j < minlen; j++) {
                if(ans[j] != s[j]) {
                    ans = ans.substr(0, j);
                    break;
                }
            }
        }
    }
    reverse(ans.begin(), ans.end());
    if (ans.length() == 0) ans = "nai";
    cout << ans;
    return 0;
}
```

## 1078 Hashing (25 分)

翻译：hash解决冲突，平方探测法。

思路：平方探测法（key + step * step）% size，size要为素数

答案：

```
#include <iostream>

using namespace std;

int size, n, hashTable[10100];

bool isprime(int num) {
    if(num == 1) return false;
    for(int i = 2; i * i <= num; i++)
        if(num % i == 0) return false;
    return true;
}

void insert(int key) {
    for(int step = 0; step < size; step++) {
        int index = (key + step * step) % size; // 平方探测 
        if(hashTable[index] == 0) {
            hashTable[index] = 1;
            cout << index % size;
            return ;
        }
    }
    cout << '-';
}

int main() {
    cin >> size >> n;
    while(!isprime(size)) size++; // size要为素数 
    for(int i = 0; i < n; i++) {
        int key;
        cin >> key;
        if(i != 0) cout << ' ';
        insert(key);
    }
    return 0;
}
```

## 1079 Total Sales of Supply Chain (25 分)

翻译：供应链为一棵树，每层在父节点价格上增加r%，问整个供应链的销售额

思路：遍历整棵树，计算销售总额，

遍历可以用dfs，也可以用bfs，

自己实战都试下。

答案：

```
#include <cstdio>
#include <vector>
#include <cmath>

using namespace std;

struct node {
    double data;
    vector<int> child;
};

vector<node> v;
double ans = 0.0, p, r;

void dfs(int index, int depth) {
    if(v[index].child.size() == 0) { // 没孩子了，返回 
        ans += v[index].data * pow(1 + r, depth);
        return ;
    }
    for(int i = 0; i < v[index].child.size(); i++)
        dfs(v[index].child[i], depth + 1);
}

int main() {
    int n, k, c;
    scanf("%d %lf %lf", &n, &p, &r);
    r = r / 100;
    v.resize(n);
    for(int i = 0; i < n; i++) {
        scanf("%d", &k);
        if(k == 0) {
            scanf("%lf", &v[i].data);
        } else {
            for(int j = 0; j < k; j++) {
                scanf("%d", &c);
                v[i].child.push_back(c); // 子节点 
            }
        }
    }
    dfs(0, 0); // 从根节点开始遍历 
    printf("%.1f", ans * p);
    return 0;
}
```

## 1080 **Graduate Admission (30 分)

翻译：学生挑学校，选志愿。

思路：排序，综合题，理解题目。

自己做一下

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
struct peo{
    int id, ge, gi, fin;
    vector<int> choice;
};
bool cmp(peo& a, peo& b) {
    if (a.fin != b.fin) return a.fin > b.fin;
    return a.ge > b.ge;
}
bool cmp2(peo& a, peo& b) {
  return a.id < b.id;
}
int main(){
    int n, m, k, quota[110], cnt[110] = {0};
    scanf("%d%d%d", &n, &m, &k);
    vector<peo> stu(n), sch[110];
    for(int i = 0; i < m; i++)
        scanf("%d",&quota[i]);
    for(int i = 0; i < n; i++) {
        scanf("%d%d", &stu[i].ge, &stu[i].gi);
        stu[i].id = i;
        stu[i].fin = stu[i].ge + stu[i].gi;
        stu[i].choice.resize(k);
        for(int j = 0; j < k; j++)
            scanf("%d", &stu[i].choice[j]);
    }
    sort(stu.begin(), stu.end(), cmp);
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < k; j++) {
            int schid = stu[i].choice[j];
            int lastindex = cnt[schid] - 1;
            if(cnt[schid] < quota[schid] || (stu[i].fin == sch[schid][lastindex].fin) && stu[i].ge == sch[schid][lastindex].ge) {
                sch[schid].push_back(stu[i]);
                cnt[schid]++;
                break;
            }
        }
    }
    for(int i = 0; i < m; i++) {
        sort(sch[i].begin(), sch[i].end(), cmp2);
        for(int j = 0; j < cnt[i]; j++) {
            if(j != 0) printf(" ");
            printf("%d", sch[i][j].id);
        }
        printf("\n");
    }
    return 0;
}
```

## 1081 Rational Sum (20 分)

翻译：计算有理分式之和

思路： 上机训练实战指南P203，分数的四则运算。

答案：

```
#include <iostream>
#include <cstdlib>

using namespace std;

// 最大公约数 
long long gcd(long long a, long long b) {return b == 0 ? abs(a) : gcd(b, a % b);}

int main() {
    long long n, a, b, suma = 0, sumb = 1, gcdvalue;
    scanf("%lld", &n);
    
	for(int i = 0; i < n; i++) {
        scanf("%lld/%lld", &a, &b); // 分子，分母 
        gcdvalue = gcd(a, b);
        
        // 化简 
        a = a / gcdvalue;
        b = b / gcdvalue;
        
        // suma/sumb + a/b
		suma = a * sumb + suma * b;
        sumb = b * sumb;
        
        // 化简suma/sumb 
        gcdvalue = gcd(suma, sumb);
        sumb = sumb / gcdvalue;
        suma = suma / gcdvalue;
    }
    
    // 整数部分 
	long long integer = suma / sumb;
	
	// 分数部分 
    suma = suma - (sumb * integer);
    
    
    // 打印整数部分 
    if(integer != 0) {
        printf("%lld", integer);
        if(suma != 0) printf(" ");
    }
    
    // 打印分数部分 
    if(suma != 0) {
    	printf("%lld/%lld", suma, sumb);
	}
        
    
    // 为0的情况 
	if(integer == 0 && suma == 0) {
    	printf("0");
	}
        
    return 0;
}
```

## 1082 Read Number in Chinese (25 分)

翻译：用拼音输出中文。

思路：找规律

答案：

```
#include <iostream>
#include <string>
#include <vector>
using namespace std;
string num[10] = { "ling","yi", "er", "san", "si", "wu", "liu", "qi", "ba", "jiu" };
string c[6] = { "Ge","Shi", "Bai", "Qian", "Yi", "Wan" };
int J[] = {1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000};
vector<string> res;
int main() {
    int n;
    cin >> n;
    if (n == 0) {
        cout << "ling";
        return 0;
    }
    if (n < 0) {
        cout << "Fu ";
        n = -n;
    }
    int part[3];
    part[0]= n / 100000000; 
    part[1]= (n % 100000000) / 10000;
    part[2] = n % 10000;
    bool zero = false; //是否在非零数字前输出合适的ling
    int printCnt = 0; //用于维护单词前没有空格，之后输入的单词都在前面加一个空格。
    for (int i = 0; i < 3; i++) {
        int temp = part[i]; //三个部分，每部分内部的命名规则都一样，都是X千X百X十X
        for (int j = 3; j >= 0; j--) {
            int curPos = 8 - i * 4 + j; //当前数字的位置
            if (curPos >= 9) continue; //最多九位数
            int cur = (temp / J[j]) % 10;//取出当前数字
            if (cur != 0) {
                if (zero) {
                    printCnt++ == 0 ? cout<<"ling" : cout<<" ling";
                    zero = false;
                }
                if (j == 0)
                    printCnt++ == 0 ? cout << num[cur] : cout << ' ' << num[cur]; //在个位，直接输出
                else                             
                    printCnt++ == 0 ? cout << num[cur] << ' ' << c[j] : cout << ' ' << num[cur] << ' ' << c[j]; //在其他位，还要输出十百千
            } else {
                if (!zero && j != 0 && n / J[curPos] >= 10) zero = true;   //注意100020这样的情况
            }
        }
        if (i != 2 && part[i]>0) cout << ' ' << c[i + 4]; //处理完每部分之后，最后输出单位，Yi/Wan
    }
    return 0;
}
```

## 1083 List Grades (25 分)

翻译：给出一系列成绩，和一个区间，给出这个区间内成绩的非递增排名。

思路：struct和排序配合，常见题型。

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct stu {
    char name[12];
    char id[12];
    int grade;
};

int cmp1(stu a, stu b) {
    return a.grade > b.grade;
}

int main() {
    int n, low, high, cnt = 0;
    scanf("%d", &n);
    vector<stu> v(n);
    for(int i = 0; i < n; i++) {
        scanf("%s %s %d", v[i].name, v[i].id, &v[i].grade);
    }
    scanf("%d %d", &low, &high);
    for(int i = 0; i < n; i++) {
        if(v[i].grade < low || v[i].grade > high) {
            v[i].grade = -1;
        } else {
            cnt++;
        }
    }
    sort(v.begin(), v.end(), cmp1);
    for(int i = 0; i < cnt; i++) {
        printf("%s %s\n", v[i].name, v[i].id);
    }
    if(cnt == 0)
        printf("NONE");
    return 0;
}
```

## 1084 Broken Keyboard (20 分)

翻译：键盘有些键被扣掉了，给你被扣掉的键是哪些，求打出来的文字变成什么。

思路：比较简单。主要是字符串的处理。柳神采用find的做法。

答案：

```
#include <iostream>
#include <cctype>
using namespace std;
int main() {
    string s1, s2, ans;
    cin >> s1 >> s2;
    for (int i = 0; i < s1.length(); i++)
        if (s2.find(s1[i]) == string::npos && ans.find(toupper(s1[i])) == string::npos)
            ans += toupper(s1[i]);
    cout << ans;
    return 0;
}
```

## 1085 **Perfect Sequence (25 分)

翻译：在一个序列中找尽可能多的序列来组成一个“完美序列”

思路：两种方法。注意读懂题目，求的是最长的“完美序列的长度”。

寻找最长的完美序列

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {

    int n;
    long long p;

	// 数的个数，p 
    scanf("%d%lld", &n, &p);

    vector<int> v(n);

	// 输入数列 
    for (int i = 0; i < n; i++)
        cin >> v[i];
	
	// 递增排序 
    sort(v.begin(), v.end());

    int result = 0, temp = 0;

    for (int i = 0; i < n; i++) {
        for (int j = i + result; j < n; j++) {
            if (v[j] <= v[i] * p) { // v[j]为M，v[i]为m 
                temp = j - i + 1; // j和i之间的距离为长度 
                if (temp > result)
                    result = temp;
            } else {
                break;
            }
        }
    }
    cout << result;
    return 0;
}
```

```
#include <iostream>
#include <algorithm>
#include <stdlib.h>
using namespace std;

int main() {
	int n;
	long long p;
	cin >> n >> p;
	if (n == 0) {
		cout << n;
		return 0;
	}
	long long int *a = new long long int[n];
	for (int i = 0; i < n; i++)
		cin >> a[i];
	sort(a, a + n);
	int result = 1;
	for (int i = 0; i < n; i++) {
		result = max((int)(upper_bound(a, a+n, a[i] * p) - (a+i)), result);
	}
	cout << result;
	return 0;
}
```

## 1086 **Tree Traversals Again (25 分)

翻译：通过栈的处理获得其中序遍历，问这棵树的后序遍历。

思路：树的遍历的问题，前序遍历，中序遍历，后序遍历。其中前序遍历与中序遍历，或者前序遍历与后序遍历，可以确定一棵树。

答案：

```
#include <cstdio>
#include <vector>
#include <stack>
#include <cstring>

using namespace std;
vector<int> pre, in, post,value;

void postorder(int root, int start, int end) {
    if (start > end) return;
    int i = start;
    while (i < end && in[i] != pre[root]) i++;
    postorder(root + 1, start, i - 1);
    postorder(root + 1 + i - start, i + 1, end);
    post.push_back(pre[root]);
}

int main() {
    int n;
    scanf("%d", &n);
    char str[5];
    stack<int> s;
    int key=0;
    while (~scanf("%s", str)) {
        if (strlen(str) == 4) {
            int num;
            scanf("%d", &num);
            value.push_back(num);
            pre.push_back(key);
            s.push(key++);
        } else {
            in.push_back(s.top());
            s.pop();
        }
    }
    postorder(0, 0, n - 1);
    printf("%d", value[post[0]]);
    for (int i = 1; i < n; i++)
        printf(" %d",value[post[i]]);
    return 0;
}
```

## 1087 **All Roads Lead to Rome (30 分)

翻译：条条大路通罗马。找通向罗马最幸福的那条路。

思路：

答案：

```
#include <iostream>
#include <map>
#include <vector>
#include <algorithm>
using namespace std;
int n, k;
const int inf = 999999999;
int e[205][205], weight[205], dis[205];
bool visit[205];
vector<int> pre[205], temppath, path;
map<string, int> m;
map<int, string> m2;
int maxvalue = 0, mindepth, cntpath = 0;
double maxavg;
void dfs(int v) {
    temppath.push_back(v);
    if(v == 1) {
        int value = 0;
        for(int i = 0; i < temppath.size(); i++) {
            value += weight[temppath[i]];
        }
        double tempavg = 1.0 * value / (temppath.size() - 1);
        if(value > maxvalue) {
            maxvalue = value;
            maxavg = tempavg;
            path = temppath;
        } else if(value == maxvalue && tempavg > maxavg) {
            maxavg = tempavg;
            path = temppath;
        }
        temppath.pop_back();
        cntpath++;
        return ;
    }
    for(int i = 0; i < pre[v].size(); i++) {
        dfs(pre[v][i]);
    }
    temppath.pop_back();
}
int main() {
    fill(e[0], e[0] + 205 * 205, inf);
    fill(dis, dis + 205, inf);
    scanf("%d %d", &n, &k);
    string s;
    cin >> s;
    m[s] = 1;
    m2[1] = s;
    for(int i = 1; i < n; i++) {
        cin >> s >> weight[i+1];
        m[s] = i+1;
        m2[i+1] = s;
    }
    string sa, sb;
    int temp;
    for(int i = 0; i < k; i++) {
        cin >> sa >> sb >> temp;
        e[m[sa]][m[sb]] = temp;
        e[m[sb]][m[sa]] = temp;
    }
    dis[1] = 0;
    for(int i = 0; i < n; i++) {
        int u = -1, minn = inf;
        for(int j = 1; j <= n; j++) {
            if(visit[j] == false && dis[j] < minn) {
                u = j;
                minn = dis[j];
            }
        }
        if(u == -1) break;
        visit[u] = true;
        for(int v = 1; v <= n; v++) {
            if(visit[v] == false && e[u][v] != inf) {
                if(dis[u] + e[u][v] < dis[v]) {
                    dis[v] = dis[u] + e[u][v];
                    pre[v].clear();
                    pre[v].push_back(u);
                } else if(dis[v] == dis[u] + e[u][v]) {
                    pre[v].push_back(u);
                }
            }
        }
    }
    int rom = m["ROM"];
    dfs(rom);
    printf("%d %d %d %d\n", cntpath, dis[rom], maxvalue, (int)maxavg);
    for(int i = path.size() - 1; i >= 1; i--) {
        cout << m2[path[i]] << "->";
    }
    cout << "ROM";
    return 0;
}
```

## 1088 **Rational Arithmetic (20 分)

翻译：分数的和差积商。

思路：属于一类考题，需背

答案：

```
#include <iostream>
#include <cmath>
using namespace std;
long long a, b, c, d;
long long gcd(long long t1, long long t2) {
    return t2 == 0 ? t1 : gcd(t2, t1 % t2);
}
void func(long long m, long long n) {
    if (m * n == 0) {
        printf("%s", n == 0 ? "Inf" : "0");
        return ;
    }
    bool flag = ((m < 0 && n > 0) || (m > 0 && n < 0));
    m = abs(m); n = abs(n);
    long long x = m / n;
    printf("%s", flag ? "(-" : "");
    if (x != 0) printf("%lld", x);
    if (m % n == 0) {
        if(flag) printf(")");
        return ;
    }
    if (x != 0) printf(" ");
    m = m - x * n;
    long long t = gcd(m, n);
    m = m / t; n = n / t;
    printf("%lld/%lld%s", m, n, flag ? ")" : "");
}
int main() {
    scanf("%lld/%lld %lld/%lld", &a, &b, &c, &d);
    func(a, b); printf(" + "); func(c, d); printf(" = "); func(a * d + b * c, b * d); printf("\n");
    func(a, b); printf(" - "); func(c, d); printf(" = "); func(a * d - b * c, b * d); printf("\n");
    func(a, b); printf(" * "); func(c, d); printf(" = "); func(a * c, b * d); printf("\n");
    func(a, b); printf(" / "); func(c, d); printf(" = "); func(a * d, b * c);
    return 0;
}
```

## 1089 **Insert or Merge (25 分)

翻译：给出原序列，再给出中间序列，问是否是插入排序还是归并排序

思路：上机训练实战指南P177 理解，插入排序与归并排序

排序算一类考点。

答案：

```
#include <iostream>
#include <algorithm>

using namespace std;

int main() {

    int n, a[100], b[100], i, j;
    cin >> n; // 序列长度 

	// 初始序列 
    for (int i = 0; i < n; i++)
        cin >> a[i];

	// 中间序列 
    for (int i = 0; i < n; i++)
        cin >> b[i];
	
	// 前半部分有序 
    for (i = 0; i < n - 1 && b[i] <= b[i + 1]; i++);
	// 后半部分与初始序列相同 
    for (j = i + 1; a[j] == b[j] && j < n; j++);
	
	// 符合上面两种情况的为插入排序 
    if (j == n) {
        cout << "Insertion Sort" << endl;
        sort(a, a + i + 2); // 打印插入排序下一步 
    } else { 
    	// 归并排序 
        cout << "Merge Sort" << endl;
        int k = 1, flag = 1;
        while(flag) {
            flag = 0;
            // 检测是否与中间序列吻合 
            for (i = 0; i < n; i++) {
                if (a[i] != b[i])
                    flag = 1;
            }
            k = k * 2;
            // 非递归归并排序过程 
            for (i = 0; i < n / k; i++)
                sort(a + i * k, a + (i + 1) * k);
            sort(a + n / k * k, a + n);
        }
    }
    for (j = 0; j < n; j++) {
        if (j != 0) printf(" ");
        printf("%d", a[j]); // 打印归并排序下一步 
    }
    return 0;
}
```

## 1090 Highest Price in Supply Chain (25 分)

翻译：求供应链树种最高价格的零售商的价格和个数。

思路：DFS遍历求树的深度，**理解树本题树的建构

答案：

```
#include <iostream>
#include <cmath>
#include <vector>

using namespace std;
int n, maxdepth = 0, maxnum = 0, temp, root;
vector<int> v[100010]; // vector数组 

// dfs算法 
void dfs(int index, int depth) { // 节点编号，深度 
    if(v[index].size() == 0) { // index节点没有子节点 
        if(maxdepth == depth) {
        	maxnum++;
		}
        if(maxdepth < depth) {
            maxdepth = depth;
            maxnum = 1;
        }
        return ;
    }
    // 从小到大递归其子树 
    for(int i = 0; i < v[index].size(); i++) {
		dfs(v[index][i], depth + 1);
	}
}

int main() {
	
    double p, r;
    scanf("%d %lf %lf", &n, &p, &r); // 人数，根节点价格，利润
    
    // temp为第i个人的供应商 
    for(int i = 0; i < n; i++) {
        scanf("%d", &temp);
        if(temp == -1)
            root = i;
        else
            v[temp].push_back(i);
    }
    
	dfs(root, 0);
    
	printf("%.2f %d", p * pow(1 + r/100, maxdepth), maxnum);
    return 0;
}
```

## 1091 **Acute Stroke (30 分)

翻译：没看懂

思路：

答案：

```
#include <cstdio>
#include <queue>
using namespace std;
struct node {
    int x, y, z;
};
int m, n, l, t;
int X[6] = {1, 0, 0, -1, 0, 0};
int Y[6] = {0, 1, 0, 0, -1, 0};
int Z[6] = {0, 0, 1, 0, 0, -1};
int arr[1300][130][80];
bool visit[1300][130][80];
bool judge(int x, int y, int z) {
    if(x < 0 || x >= m || y < 0 || y >= n || z < 0 || z >= l) return false;
    if(arr[x][y][z] == 0 || visit[x][y][z] == true) return false;
    return true;
}
int bfs(int x, int y, int z) {
    int cnt = 0;
    node temp;
    temp.x = x, temp.y = y, temp.z = z;
    queue<node> q;
    q.push(temp);
    visit[x][y][z] = true;
    while(!q.empty()) {
        node top = q.front();
        q.pop();
        cnt++;
        for(int i = 0; i < 6; i++) {
            int tx = top.x + X[i];
            int ty = top.y + Y[i];
            int tz = top.z + Z[i];
            if(judge(tx, ty, tz)) {
                visit[tx][ty][tz] = true;
                temp.x = tx, temp.y = ty, temp.z = tz;
                q.push(temp);
            }
        }
    }
    if(cnt >= t)
        return cnt;
    else
        return 0;
    
}
int main() {
    scanf("%d %d %d %d", &m, &n, &l, &t);
    for(int i = 0; i < l; i++)
        for(int j = 0; j < m; j++)
            for(int k = 0; k < n; k++)
                scanf("%d", &arr[j][k][i]);
    int ans = 0;
    for(int i = 0; i < l; i++) {
        for(int j = 0; j < m; j++) {
            for(int k = 0; k < n; k++) {
                if(arr[j][k][i] == 1 && visit[j][k][i] == false)
                    ans += bfs(j, k, i);
            }
        }
    }
    printf("%d", ans);
    return 0;
}
```

## 1092 To Buy or Not to Buy (20 分)

翻译：有颜色的珠子只能整条买，问是否值得买（包含所有的颜色就要买）。

思路：字符串对比。利用map。

答案：

```
#include <iostream>

using namespace std;
int book[256];

int main() {

    string a, b;
    cin >> a >> b; 

    for (int i = 0; i < a.length(); i++)
        book[a[i]]++;
    int result = 0;

    for (int i = 0; i < b.length(); i++) {
        if (book[b[i]] > 0)
            book[b[i]]--;
        else
            result++; // 找到了没有的珠子 
    }
    if(result != 0)
        printf("No %d", result);
    else
        printf("Yes %d", a.length() - b.length());
    return 0;
}
```

## 1093 Count PAT's (25 分)

翻译：问一段字符串中有多少个pat

思路：对每一个A，之前的P乘上之后的T。

答案：

```
#include <iostream>
#include <string>
using namespace std;
int main() {
    string s;
    cin >> s;
    int len = s.length(), result = 0, countp = 0, countt = 0;
    for (int i = 0; i < len; i++) {
        if (s[i] == 'T')
            countt++;
    }
    for (int i = 0; i < len; i++) {
        if (s[i] == 'P') countp++;
        if (s[i] == 'T') countt--;
        if (s[i] == 'A') result = (result + (countp * countt) % 1000000007) % 1000000007; // 需要边乘边取余，不然会溢出 
    }
    cout << result;
    return 0;
}
```

## 1094 **The Largest Generation (25 分)

翻译：找出家谱树中最多人的一代。

思路：求最多节点的一层。BFS，DFS都可以。

典型题。

与1004及其相似

答案：

DFS

```
#include <cstdio>
#include <vector>
using namespace std;
vector<int> v[100];
int book[100];
void dfs(int index, int level) {
    book[level]++;
    for(int i = 0; i < v[index].size(); i++)
        dfs(v[index][i], level+1);
}
int main() {
    int n, m, a, k, c;
    scanf("%d %d", &n, &m);
    for(int i = 0; i < m; i++) {
        scanf("%d %d",&a, &k);
        for(int j = 0; j < k; j++) {
            scanf("%d", &c);
            v[a].push_back(c);
        }
    }
    dfs(1, 1);
    int maxnum = 0, maxlevel = 1;
    for(int i = 1; i < 100; i++) {
        if(book[i] > maxnum) {
            maxnum = book[i];
            maxlevel = i;
        }
    }
    printf("%d %d", maxnum, maxlevel);
    return 0;
}
```

BFS

```
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;
vector<int> v[100];
int level[100];
int book[100];
int main() {
    int n, m, a, k, c;
    scanf("%d %d", &n, &m);
    for(int i = 0; i < m; i++) {
        scanf("%d %d",&a, &k);
        for(int j = 0; j < k; j++) {
            scanf("%d", &c);
            v[a].push_back(c);
        }
    }
    queue<int> q;
    q.push(1);
    level[1] = 1;
    while(!q.empty()) {
        int index = q.front();
        q.pop();
        book[level[index]]++;
        for(int i = 0; i < v[index].size(); i++) {
            level[v[index][i]] = level[index] + 1;
            q.push(v[index][i]);
        }
        
    }
    int maxnum = 0, maxlevel = 1;
    for(int i = 1; i < 100; i++) {
        if(book[i] > maxnum) {
            maxnum = book[i];
            maxlevel = i;
        }
    }
    printf("%d %d", maxnum, maxlevel);
    return 0;
}
```

自己写的

```
#include <cstdio>
#include <vector> 
 
using namespace std;

vector<int> tree[100];

vector<int> count(100, 0);

void dfs (int index, int level) {
	
	count[level]++;
	
	for (int i = 0; i < tree[index].size(); i++) {
		
		dfs(tree[index][i], level + 1);
		
	} 
	
}

int main () {
	
	int n, m;
	
	scanf("%d %d", &n, &m); // 节点总数，非叶节点数
	
	for (int i = 0; i < m; i++) {
		int index, cNum; // 节点编号，节点子树数 
		scanf("%d %d", &index, &cNum);
		for (int j = 0; j < cNum; j++) {
			int temp;
			scanf("%d", &temp);
			tree[index].push_back(temp);	
		}
	}
	
	dfs(1, 1);
	
	int levelIndex = 1, levelMaxNum = 0;
	for (int i = 1; i < 100; i++) {
		if (count[i] > levelMaxNum) {
			levelIndex = i;
			levelMaxNum = count[i];
		} 
	}
	
	printf("%d %d", levelMaxNum, levelIndex);
	
	return 0;
} 
```

## 1095 **Cars on Campus (30 分)

翻译：查询某个时间停了多少车，以及一天结束后停车时间最久的车。

思路：map排序

分类待定

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstring>
#include <string>
#include <map>
using namespace std;
struct node {
    char id[10];
    int time, flag = 0;
};
bool cmp1(node a, node b) {
    if(strcmp(a.id, b.id) != 0)
        return strcmp(a.id, b.id) < 0;
    else
        return a.time < b.time;
}
bool cmp2(node a, node b) {
    return a.time < b.time;
}
int main() {
    int n, k, maxtime = -1, tempindex = 0;
    scanf("%d%d\n", &n, &k);
    vector<node> record(n), car;
    for(int i = 0; i < n; i++) {
        char temp[5];
        int h, m, s;
        scanf("%s %d:%d:%d %s\n", record[i].id, &h, &m, &s, temp);
        int temptime = h * 3600 + m * 60 + s;
        record[i].time = temptime;
        record[i].flag = strcmp(temp, "in") == 0 ? 1 : -1;
    }
    sort(record.begin(), record.end(), cmp1);
    map<string, int> mapp;
    for(int i = 0; i < n - 1; i++) {
        if(strcmp(record[i].id, record[i+1].id) == 0 && record[i].flag == 1 && record[i+1].flag == -1) {
            car.push_back(record[i]);
            car.push_back(record[i+1]);
            mapp[record[i].id] += (record[i+1].time - record[i].time);
            if(maxtime < mapp[record[i].id]) {
                maxtime = mapp[record[i].id];
            }
        }
    }
    sort(car.begin(), car.end(), cmp2);
    vector<int> cnt(n);
    for(int i = 0; i < car.size(); i++) {
        if(i == 0)
            cnt[i] += car[i].flag;
         else
            cnt[i] = cnt[i - 1] + car[i].flag;
    }
    for(int i = 0; i < k; i++) {
        int h, m, s;
        scanf("%d:%d:%d", &h, &m, &s);
        int temptime = h * 3600 + m * 60 + s;
        int j;
        for(j = tempindex; j < car.size(); j++) {
            if(car[j].time > temptime) {
                printf("%d\n", cnt[j - 1]);
                break;
            } else if(j == car.size() - 1) {
                printf("%d\n", cnt[j]);
            }
        }
        tempindex = j;
    }
    for(map<string, int>::iterator it = mapp.begin(); it != mapp.end(); it++) {
        if(it->second == maxtime)
            printf("%s ", it->first.c_str());
    }
    printf("%02d:%02d:%02d", maxtime / 3600, (maxtime % 3600) / 60, maxtime % 60);
    return 0;
}
```

## 1096 **Consecutive Factors (20 分)

翻译：有多少连续的乘级因子。

思路：数学问题。

分类到数学问题中。

// 因数的最大上限为sqrt(N) + 1

答案：

```
#include <iostream>
#include <cmath>

using namespace std;

long int num, temp;

int main(){

    cin >> num; // 数字 
    int first = 0, len = 0, maxn = sqrt(num) + 1 // 因数的最大上限为sqrt(N) + 1;

    for (int i = 2; i <= maxn; i++) {
        int j; 
        temp = 1;
        for (j = i; j <= maxn; j++) {
            temp *= j; // 一段连续的序列能够除尽 
            if (num % temp != 0) break; // 直到除不尽，退出 
        }
        // 更新 
        if (j - i > len) {
            len = j - i;
            first = i;
        }
    }
    if (first == 0) {
        cout << 1 << endl << num;
    } else {
        cout << len << endl;
        for (int i = 0; i < len; i++) {
            cout << first + i;
            if (i != len - 1) cout << '*';
        }
    }
    return 0;
}
```

## 1097 Deduplication on a Linked List (25 分)

翻译：一个链表，重复的值只留第一个。

思路：链表放在数组中排序。数组可以绝对的转化位置。

用map来标记是否重复

答案：

```
#include <cstdio>
#include <stdlib.h>
#include <algorithm>

using namespace std;
const int maxn = 100000;

struct NODE {
    int address, key, next, num = 2 * maxn;
} node[maxn];
bool exist[maxn];

int cmp1(NODE a, NODE b){
    return a.num < b.num;
}

int main() {
    int begin, n, cnt1 = 0, cnt2 = 0, a;
    scanf("%d%d", &begin, &n); // 开始节点 与 节点数量。
	 
    for(int i = 0; i < n; i++) {
        scanf("%d", &a); // 地址 
        scanf("%d%d", &node[a].key, &node[a].next); // 值与next 
        node[a].address = a;
    }
    
	for(int i = begin; i != -1; i = node[i].next) {
        if(exist[abs(node[i].key)] == false) { // 第一次出现  
            exist[abs(node[i].key)] = true;
            node[i].num = cnt1;
            cnt1++; // 第一组序列排序 
        }
        else { // 出现过一次
            node[i].num = maxn + cnt2; // 排到后面去了 
            cnt2++; // 第二组序列排序 
        }
    }
    
	// 按照num标记的进行排序 
    sort(node, node + maxn, cmp1);
    
	int cnt = cnt1 + cnt2;
    
    // 链表打印有技巧 
	for(int i = 0; i < cnt; i++) {
        if(i != cnt1 - 1 && i != cnt - 1) {
            printf("%05d %d %05d\n", node[i].address, node[i].key, node[i+1].address);
        } else {
            printf("%05d %d -1\n", node[i].address, node[i].key);
        }
    }
    
	return 0;
}
```

## 1098 **Insertion or Heap Sort (25 分)

翻译：给出初始序列和中间序列，问你是插入排序还是堆排序。

思路：与 1089 **Insert or Merge (25 分) 联动

考点为排序算法。

堆排序部分没看懂

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

void downAdjust(vector<int> &b, int low, int high) {
    int i = 1, j = i * 2;
    while(j <= high) {
        if(j + 1 <= high && b[j] < b[j + 1]) j = j + 1;
        if (b[i] >= b[j]) break;
        swap(b[i], b[j]);
        i = j; j = i * 2;
    }
}

int main() {

    int n, p = 2;
    scanf("%d", &n); // 序列长度 

    vector<int> a(n + 1), b(n + 1);
	
	// 初始序列 
    for(int i = 1; i <= n; i++) scanf("%d", &a[i]);
	
	// 中间序列 
    for(int i = 1; i <= n; i++) scanf("%d", &b[i]);
	
	// 前半段有序 
    while(p <= n && b[p - 1] <= b[p]) p++;
    int index = p;
    // 后半段与初始序列相同 
    while(p <= n && a[p] == b[p]) p++;
    
    // 符合以上两点即为插入排序 
    if(p == n + 1) {
        printf("Insertion Sort\n");
        sort(b.begin() + 1, b.begin() + index + 1);
    } else {
    	// 堆排序 
        printf("Heap Sort\n");
        p = n;
        while(p > 2 && b[p] >= b[1]) p--;
        swap(b[1], b[p]);
        downAdjust(b, 1, p - 1);
    }
    printf("%d", b[1]);
    for(int i = 2; i <= n; i++)
        printf(" %d", b[i]);
    return 0;
}
```

## 1099 **Build A Binary Search Tree (30 分)

翻译：建立一个二叉搜索树，并输出其层序排列。

思路：二叉搜索树。

数列从小到大排序，排序树的中序遍历一定为递增序列 

以这个性质为线索

答案：

```
#include <iostream>
#include <algorithm>

using namespace std;

int n, cnt, b[100];

struct node {
    int data, l, r, index, lebel;
} a[110];

// 层序排列 
bool cmp(node x, node y) {
	// 层小的排前面，相同层的index小的排前面 
    if (x.lebel != y.lebel) return x.lebel < y.lebel;
    return x.index < y.index;
}

// 中序遍历 LNR // index为层序排列用的序号，lebel为层 
void dfs(int root, int index, int lebel) {
	// 如果是叶节点 
    if (a[root].l == -1 && a[root].r == -1) {
        a[root] = {b[cnt++], a[root].l, a[root].r, index, lebel};
    } else {
    	// 向左走（L） 
        if (a[root].l != -1) dfs(a[root].l, index * 2 + 1, lebel + 1);
        // 赋值（N） 
		a[root] = {b[cnt++], a[root].l, a[root].r, index, lebel};
        // 向右走（R） 
		if (a[root].r != -1) dfs(a[root].r, index * 2 + 2, lebel + 1);
    }
}

int main() {

    cin >> n; // 总节点数 
	
	// 数的左右index 
    for (int i = 0; i < n; i++)
        cin >> a[i].l >> a[i].r;
	
	// 题目给的数列 
    for (int i = 0; i < n; i++)
        cin >> b[i];
	
	// 数列从小到大排序，排序树的中序遍历一定为递增序列 
    sort(b, b + n);

	// 中序遍历
    dfs(0, 0, 0);
	
	// 层序排列 
    sort(a, a + n, cmp);

    for (int i = 0; i < n; i++) {
        if (i != 0) cout << " ";
        cout << a[i].data;
    }
    return 0;
}
```

## 1100 Mars Numbers (20 分)

翻译：火星数字与地球数字转化

思路：乙级有做过。考点为数字的进制转化。

答案：

```
#include <iostream>
#include <string>
using namespace std;
string a[13] = {"tret", "jan", "feb", "mar", "apr", "may", "jun", "jly", "aug", "sep", "oct", "nov", "dec"};
string b[13] = {"####", "tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mer", "jou"};
string s;
int len;
void func1(int t) {
    if (t / 13) cout << b[t / 13];
    if ((t / 13) && (t % 13)) cout << " ";
    if (t % 13 || t == 0) cout << a[t % 13];
}
void func2() {
    int t1 = 0, t2 = 0;
    string s1 = s.substr(0, 3), s2;
    if (len > 4) s2 = s.substr(4, 3);
    for (int j = 1; j <= 12; j++) {
        if (s1 == a[j] || s2 == a[j]) t2 = j;
        if (s1 == b[j]) t1 = j;
    }
    cout << t1 * 13 + t2;
}
int main() {
    int n;
    cin >> n;
    getchar();
    for (int i = 0; i < n; i++) {
        getline(cin, s);
        len = s.length();
        if (s[0] >= '0' && s[0] <= '9')
            func1(stoi(s));
        else
            func2();
        cout << endl;
    }
    return 0;
}
```

## 1101 Quick Sort (25 分)

翻译：pivot左小右大，给一个序列，问pivot有几个。

思路：逻辑题。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>

int v[100000];
using namespace std;

int main() {

    int n, max = 0, cnt = 0;
    scanf("%d", &n);
    vector<int> a(n), b(n);

    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        b[i] = a[i];
    }

    sort(a.begin(), a.end()); // 将a排序 

	/* 
		当当前元素没有变化
		并且
		它左边的所有值的最大值都比它小的时候
		就可以认为它一定是主元
	*/
	for (int i = 0; i < n; i++) {
        if(a[i] == b[i] && b[i] > max) // 它左边的所有值的最大值都比它小 
            v[cnt++] = b[i]; // 主元 
        if (b[i] > max)
            max = b[i];
    }
    
	printf("%d\n", cnt);
    
	for(int i = 0; i < cnt; i++) {
        if (i != 0) printf(" ");
        printf("%d", v[i]);
    }
    
	printf("\n");
    return 0;
}
```

## 1102 **Invert a Binary Tree (25 分)

翻译：Google: 90% of our engineers use the software you wrote (Homebrew), but you can't invert a binary tree on a whiteboard so fuck off.

证明你可以翻转二叉树。输出翻转后的层序遍历与中序遍历。

思路：

反转二叉树就是存储的时候所有左右结点都交换，接着有层序遍历算法与中序遍历算法。

综合性比较强的一题。

答案：

```
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct node {
    int id, l, r, index, level;
} a[100];

vector<node> v1;

// 中序遍历 
void dfs(int root, int index, int level) {
    if (a[root].r != -1) dfs(a[root].r, index * 2 + 2, level + 1);
    v1.push_back({root, 0, 0, index, level});
    if (a[root].l != -1) dfs(a[root].l, index * 2 + 1, level + 1);
}

// 层序遍历 
bool cmp(node a, node b) {
    if (a.level != b.level) return a.level < b.level;
    return a.index > b.index;
}

int main() {
    int n, have[100] = {0}, root = 0;
    cin >> n; // 节点数量 
    for (int i = 0; i < n; i++) {
        a[i].id = i;
        string l, r;
        cin >> l >> r;
        if (l != "-") {
            a[i].l = stoi(l);
            have[stoi(l)] = 1;
        } else {
            a[i].l = -1;
        }
        if (r != "-") {
            a[i].r = stoi(r);
            have[stoi(r)] = 1;
        } else {
            a[i].r = -1;
        }
    }
    while (have[root] == 1) root++;
    
	dfs(root, 0, 0);
    
	vector<node> v2(v1);
    sort(v2.begin(), v2.end(), cmp);
    
	for (int i = 0; i < v2.size(); i++) {
        if (i != 0) cout << " ";
        cout << v2[i].id;
    }
    cout << endl;
    for (int i = 0; i < v1.size(); i++) {
        if (i != 0) cout << " ";
        cout << v1[i].id;
    }
    return 0;
}
```

## 1103 **Integer Factorization (30 分)

翻译：

思路：

答案：

```
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;
int n, k, p, maxFacSum = -1;
vector<int> v, ans, tempAns;
void init() {
    int temp = 0, index = 1;
    while (temp <= n) {
        v.push_back(temp);
        temp = pow(index, p);
        index++;
    }
}
void dfs(int index, int tempSum, int tempK, int facSum) {
    if (tempK == k) {
        if (tempSum == n && facSum > maxFacSum) {
                ans = tempAns;
                maxFacSum = facSum;
        }
        return;
    }
    while(index >= 1) {
        if (tempSum + v[index] <= n) {
            tempAns[tempK] = index;
            dfs(index, tempSum + v[index], tempK + 1, facSum + index);
        }
        if (index == 1) return;
        index--;
    }
}
int main() {
    scanf("%d%d%d", &n, &k, &p);
    init(); 
    tempAns.resize(k);
    dfs(v.size() - 1, 0, 0, 0);
    if (maxFacSum == -1) {
        printf("Impossible");
        return 0;
    }
    printf("%d = ", n);
    for (int i = 0; i < ans.size(); i++) {
        if (i != 0) printf(" + ");
        printf("%d^%d", ans[i], p);
    }
    return 0;
}
```

## 1104 **Sum of Number Segments (20 分)

翻译：所有片段和。

思路：数学问题。逻辑题。

1 * 4 * 0.1 = 0.4

2 * 3 * 0.2 = 1.2

3 * 2 * 0.3 = 1.8

4 * 1 * 0.4 = 1.6

答案：

```
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    double sum = 0.0, temp;
    for (int i = 1; i <= n; i++) { 
        cin >> temp;
        sum = sum + temp * i * (n - i + 1);
    }
    printf("%.2f", sum);
    return 0;
}
```

## 1105 Spiral Matrix (25 分)

翻译：数列先排序，然后再做成一个旋转的矩阵。

思路：逻辑题。

答案：

```
#include <iostream>
#include <algorithm>
#include <cmath>
#include <vector>
using namespace std;
int cmp(int a, int b) {return a > b;}
int main() {
    int N, m, n, t = 0;
    scanf("%d", &N);
    for (n = sqrt((double)N); n >= 1; n--) {
        if (N % n == 0) {
            m = N / n;
            break;
        }
    }
    vector<int> a(N);
    for (int i = 0; i < N; i++)
        scanf("%d", &a[i]);
    sort(a.begin(), a.end(), cmp);
    vector<vector<int> > b(m, vector<int>(n));
    int level = m / 2 + m % 2;
    for (int i = 0; i < level; i++) {
        for (int j = i; j <= n - 1 - i && t <= N - 1; j++)
                b[i][j] = a[t++];
        for (int j = i + 1; j <= m - 2 - i && t <= N - 1; j++)
                b[j][n - 1 - i] = a[t++];
        for (int j = n - i - 1; j >= i && t <= N - 1; j--)
                b[m - 1 - i][j] = a[t++];
        for (int j = m - 2 - i; j >= i + 1 && t <= N - 1; j--)
                b[j][i] = a[t++];
    }
    for (int i = 0; i < m; i++) {
        for (int j = 0 ; j < n; j++) {
            printf("%d", b[i][j]);
            if (j != n - 1) printf(" ");
        }
        printf("\n");
    }
    return 0;
}
```

## 1106 Lowest Price in Supply Chain (25 分)

翻译：寻找供应链中最便宜的零售商

思路：树的遍历

1090 Highest Price in Supply Chain (25 分)

1079 Total Sales of Supply Chain (25 分)

答案：

```
#include <cstdio>
#include <vector>
#include <cmath>

using namespace std;
vector<int> v[100005];
int mindepth = 99999999, minnum = 1;

void dfs(int index, int depth) {
    if(mindepth < depth) // 如果深度大于最短深度，那没必要往下找了 
        return ;
    if(v[index].size() == 0) { // 叶节点
		// 寻找深度最短的叶节点 
        if(mindepth == depth)
            minnum++;
        else if(mindepth > depth) {
            mindepth = depth;
            minnum = 1;
        }
    }
    // dfs递归 
    for(int i = 0; i < v[index].size(); i++)
        dfs(v[index][i], depth + 1);
}

int main() {
	
    int n, k, c;
    double p, r;
    
    scanf("%d %lf %lf", &n, &p, &r); // 节点总数，根节点价格，利润率 
    
    // 构成树 
    for(int i = 0; i < n; i++) {
        scanf("%d", &k);
        for(int j = 0; j < k; j++) {
            scanf("%d", &c);
            v[i].push_back(c);
        }
    }
    
    dfs(0, 0);
    
    printf("%.4f %d", p * pow(1 + r/100, mindepth), minnum);
    return 0;
}
```

## 1107 Social Clusters (30 分)

翻译：给出一些人的兴趣，将这些人按照兴趣相同的分组。

思路：并查集

答案：

```
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;
vector<int> father, isRoot;
int cmp1(int a, int b){return a > b;}
int findFather(int x) {
    int a = x;
    while(x != father[x])
        x = father[x];
    while(a != father[a]) {
        int z = a;
        a = father[a];
        father[z] = x;
    }
    return x;
}
void Union(int a, int b) {
    int faA = findFather(a);
    int faB = findFather(b);
    if(faA != faB) father[faA] = faB;
}
int main() {
    int n, k, t, cnt = 0;
    int course[1001] = {0};
    scanf("%d", &n);
    father.resize(n + 1);
    isRoot.resize(n + 1);
    for(int i = 1; i <= n; i++)
        father[i] = i;
    for(int i = 1; i <= n; i++) {
        scanf("%d:", &k);
        for(int j = 0; j < k; j++) {
            scanf("%d", &t);
            if(course[t] == 0)
                course[t] = i;
            Union(i, findFather(course[t]));
        }
    }
    for(int i = 1; i <= n; i++)
        isRoot[findFather(i)]++;
    for(int i = 1; i <= n; i++) {
        if(isRoot[i] != 0) cnt++;
    }
    printf("%d\n", cnt);
    sort(isRoot.begin(), isRoot.end(), cmp1);
    for(int i = 0; i < cnt; i++) {
        printf("%d", isRoot[i]);
        if(i != cnt - 1) printf(" ");
    }
    return 0;
}
```

## 1108 Finding Average (20 分)

翻译：算平均数，并排除不合法的数。

思路：简单题。

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

    cin >> n; // 总输入个数 

    for(int i = 0; i < n; i++) {
        
		scanf("%s", a); // 输入字符 
        
		sscanf(a, "%lf", &temp); // 将a转化为浮点数 
        
		sprintf(b, "%.2f", temp); // 将temp转化为b（字符串），保留小数点后两位 
        
		int flag = 0;
		
		// 经过转化之后，若不相等，则为不合法的浮点数 
        for(int j = 0; j < strlen(a); j++)
            if(a[j] != b[j]) flag = 1;
        
		if(flag || temp < -1000 || temp > 1000) {
            printf("ERROR: %s is not a legal number\n", a);
            continue;
        } else {
            sum += temp;
            cnt++;
        }
    }

    if(cnt == 1)
        printf("The average of 1 number is %.2f", sum);
    else if(cnt > 1)
        printf("The average of %d numbers is %.2f", cnt, sum / cnt);
    else
        printf("The average of 0 numbers is Undefined");
    return 0;
}
```

## 1109 Group Photo (25 分)

翻译：团体拍照如何布局。每排N/K个，后排要不低于前排，最高的站中间，其他依次递减，相同的按名字排。

思路：先从高到矮排，再分排，最后分一排中的左边与右边。

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
int cmp(struct node a, struct node b) {
    return a.height != b.height ? a.height > b.height : a.name < b.name;
}
int main() {
    int n, k, m;
    cin >> n >> k;
    vector<node> stu(n);
    for(int i = 0; i < n; i++) {
        cin >> stu[i].name;
        cin >> stu[i].height;
    }
    sort(stu.begin(), stu.end(), cmp);
    int t = 0, row = k;
    while(row) {
        if(row == k) {
            m = n - n / k * (k - 1);
        } else {
            m = n / k;
        }
        vector<string> ans(m);
        ans[m / 2] = stu[t].name;
        // 左边一列
        int j = m / 2 - 1;
        for(int i = t + 1; i < t + m; i = i + 2)
            ans[j--] = stu[i].name;
        // 右边一列
        j = m / 2 + 1;
        for(int i = t + 2; i < t + m; i = i + 2)
            ans[j++] = stu[i].name;
        // 输出当前排
        cout << ans[0];
        for(int i = 1; i < m; i++)
            cout << " " << ans[i];
        cout << endl;
        t = t + m;
        row--;
    }
    return 0;
}
```

## 1110 Complete Binary Tree (25 分)

翻译：检查是否是完全二叉树。

思路：若是完全二叉树，最大的maxn会等于n。

答案：

```
#include <iostream>

using namespace std;

struct node{
    int l, r;
} a[100];

int maxn = -1, ans;

// dfs算法 
void dfs(int root, int index) {
	// 遍历中更新maxn 
    if(index > maxn) {
        maxn = index;
        ans = root;
    }
    if(a[root].l != -1) dfs(a[root].l, index * 2);
    if(a[root].r != -1) dfs(a[root].r, index * 2 + 1);
}

int main() {

    int n, root = 0, have[100] = { 0 };

    cin >> n; // 节点总数 

    for (int i = 0; i < n; i++) {
        string l, r;
        cin >> l >> r; // 左子树，右子树 
        if (l == "-") {
            a[i].l = -1;
        } else {
            a[i].l = stoi(l);
            have[stoi(l)] = 1;
        }
        if (r == "-") {
            a[i].r = -1;
        } else {
            a[i].r = stoi(r);
            have[stoi(r)] = 1;
        }
    }
    
    // 根节点为 0 到 n-1 中 
    while (have[root] != 0) root++;
    
    // index从1开始 
	dfs(root, 1);
	
    if (maxn == n)
        cout << "YES " << ans;
    else
        cout << "NO " << root;
    return 0;
}
```

## 1111 **Online Map (30 分)

翻译：

求路径的“最短距离”和“最快距离”

思路：

1. 节点序号从0到N-1

2. 1是单向，0是双向


Dijkstra算法。

比较复杂，自己做做看。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

const int inf = 999999999;
int dis[510], Time[510], e[510][510], w[510][510], dispre[510], Timepre[510], weight[510], NodeNum[510];
bool visit[510];
vector<int> dispath, Timepath, temppath;
int st, fin, minnode = inf;

// 通过dispre追溯路径 
void dfsdispath(int v) {
    dispath.push_back(v);
    if(v == st) return ;
    dfsdispath(dispre[v]);
}

void dfsTimepath(int v) {
    Timepath.push_back(v);
    if(v == st) return ;
    dfsTimepath(Timepre[v]);
}

int main() {

    fill(dis, dis + 510, inf);
    fill(Time, Time + 510, inf);
    fill(weight, weight + 510, inf);
    fill(e[0], e[0] + 510 * 510, inf); // 边长度 
    fill(w[0], w[0] + 510 * 510, inf); // 边时间 
    int n, m;

    scanf("%d %d", &n, &m); // 节点的个数，边的个数 
 
    int a, b, flag, len, t;
    for(int i = 0; i < m; i++) {
    	// V1，V2，是否单向（1为单向），长度，时间 
        scanf("%d %d %d %d %d", &a, &b, &flag, &len, &t);
        e[a][b] = len;
        w[a][b] = t;
        if(flag != 1) { // 如果为双向 
            e[b][a] = len;
            w[b][a] = t;
        }
    }
    
    // 出发点与目的地 
    scanf("%d %d", &st, &fin); // 有出发点，是单源最短路径 
    
    
    // 第一个Dijkstra，求长度最短路径 
    dis[st] = 0; // dis为st到其他各点的最短路径 
    for(int i = 0; i < n; i++) {
    	dispre[i] = i; // 最短距离前驱节点 
	}
    for(int i = 0; i < n; i++) {
    	// 找一个未访问的，距离st最短的节点 
        int u = -1, minn = inf;
        for(int j = 0; j < n; j++) {
            if(visit[j] == false && dis[j] < minn) {
                // 找到该节点，把该节点赋给u 
				u = j;
                minn = dis[j];
            }
        }
        if(u == -1) break; // u没找到，结束算法 
        visit[u] = true;
        for(int v = 0; v < n; v++) {
        	// 没有被访问的，并且与u相邻（有边）的节点 
            if(visit[v] == false && e[u][v] != inf) {
            	// 如果经过u使得该节点路径更短了，则更新路径 
                if(e[u][v] + dis[u] < dis[v]) { // 加入u更短 
                    dis[v] = e[u][v] + dis[u]; // 更新路径 
                    dispre[v] = u;
                    weight[v] = weight[u] + w[u][v]; // 更新时间 
                } else if(e[u][v] + dis[u] == dis[v] && weight[v] > weight[u] + w[u][v]) { // 如果相同求时间最短的那条 
                    weight[v] = weight[u] + w[u][v];
                    dispre[v] = u;
                }
            }
        }
    }
    
    // 通过dispre追溯路径
    dfsdispath(fin);
    
    
    // 第二个Dijkstra，求时间最短路径
    Time[st] = 0;
    fill(visit, visit + 510, false); // 重置 
    for(int i = 0; i < n; i++) {
    	// 找一个未访问的，距离st时间最短的节点
        int u = -1, minn = inf;
        for(int j = 0; j < n; j++) {
            if(visit[j] == false && minn > Time[j]) {
                // 该节点为u 
				u = j;
                minn = Time[j];
            }
        }
        if(u == -1) break; // 未找到该节点，退出算法 
        visit[u] = true;
        for(int v = 0; v < n; v++) {
        	// 没有被访问的，并且与u相邻（有边）的节点
            if(visit[v] == false && w[u][v] != inf) {
            	// 如果经过u使得该节点时间路径更短了，则更新路径
                if(w[u][v] + Time[u] < Time[v]) {
                    Time[v] = w[u][v] + Time[u]; // 更新路径 
                    Timepre[v] = u;
                    NodeNum[v] = NodeNum[u] + 1;
                } else if(w[u][v] + Time[u] == Time[v]&&NodeNum[u]+1<NodeNum[v]) { // 如果相同求结点数最小的那条 
                    Timepre[v] = u;
                    NodeNum[v] = NodeNum[u]+1;
                }
            }
        }
    }
    // 通过Timepre追溯路径
    dfsTimepath(fin);
    
    
    // 打印结果 
    printf("Distance = %d", dis[fin]);
    if(dispath == Timepath) { // 如果两个路径完全相同 
        printf("; Time = %d: ", Time[fin]);
    } else {
        printf(": ");
        for(int i = dispath.size() - 1; i >= 0; i--) {
            printf("%d", dispath[i]);
            if(i != 0) printf(" -> ");
        }
        printf("\nTime = %d: ", Time[fin]);
    }
    for(int i = Timepath.size() - 1; i >= 0; i--) {
        printf("%d", Timepath[i]);
        if(i != 0) printf(" -> ");
    }
    
    return 0;
}
```


## 1112 Stucked Keyboard (20 分)

翻译：给一个字符串，检查哪些键卡住了。

思路：字符串处理，map标记。

答案：

```
#include <iostream>
#include <map>
#include <cstdio>
#include <set>

using namespace std;
bool sureNoBroken[256];

int main() {
    int k, cnt = 1;
    
	scanf("%d", &k);
    string s;
    
	cin >> s;
    map<char, bool> m;
    set<char> printed;
    char pre = '#';
    s = s + '#';
    
	for(int i = 0; i < s.length(); i++) {
        if(s[i] == pre) {
            cnt++;
        } else {
            if(cnt % k != 0) {
                sureNoBroken[pre] = true;
            }
            cnt = 1;
        }
        if(i != s.length() - 1) m[s[i]] = (cnt % k == 0);
        pre = s[i];
    }
    
	for(int i = 0; i < s.length() - 1; i++) {
        if(sureNoBroken[s[i]] == true)
            m[s[i]] = false;
    }
    
	for(int i = 0; i < s.length() - 1; i++) {
        if(m[s[i]] && printed.find(s[i]) == printed.end()) {
            printf("%c", s[i]);
            printed.insert(s[i]);
        }
    }
    
	printf("\n");
    
	for(int i = 0; i < s.length() - 1; i++) {
        printf("%c", s[i]);
        if(m[s[i]])
            i = i + k - 1;
    }
    
	return 0;
}
```

## 1113 Integer Set Partition (25 分)

翻译：一个数列分为两个，使得两个集合的元素个数相差最小的前提下，两个集合的总和之差最大。

思路：排序后分成一半。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
int main() {
    int n, sum = 0, halfsum = 0;
    scanf("%d", &n);
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        scanf("%d", &v[i]);
        sum += v[i];
    }
    sort(v.begin(), v.end());
    for(int i = 0; i < n / 2; i++)
        halfsum += v[i];
    printf("%d %d", n % 2, sum - 2 * halfsum);
    return 0;
}
```

## 1114 Family Property (25 分)

翻译：给出许多信息，问一个家庭的平均资产。

思路：并查集。

答案：

```
#include <cstdio>
#include <algorithm>
using namespace std;
struct DATA {
    int id, fid, mid, num, area;
    int cid[10];
}data[1005];
struct node {
    int id, people;
    double num, area;
    bool flag = false;
}ans[10000];
int father[10000];
bool visit[10000];
int find(int x) {
    while(x != father[x])
        x = father[x];
    return x;
}
void Union(int a, int b) {
    int faA = find(a);
    int faB = find(b);
    if(faA > faB)
        father[faA] = faB;
    else if(faA < faB)
        father[faB] = faA;
}
int cmp1(node a, node b) {
    if(a.area != b.area)
        return a.area > b.area;
    else
        return a.id < b.id;
}
int main() {
    int n, k, cnt = 0;
    scanf("%d", &n);
    for(int i = 0; i < 10000; i++)
        father[i] = i;
    for(int i = 0; i < n; i++) {
        scanf("%d %d %d %d", &data[i].id, &data[i].fid, &data[i].mid, &k);
        visit[data[i].id] = true;
        if(data[i].fid != -1) {
            visit[data[i].fid] = true;
            Union(data[i].fid, data[i].id);
        }
        if(data[i].mid != -1) {
            visit[data[i].mid] = true;
            Union(data[i].mid, data[i].id);
        }
        for(int j = 0; j < k; j++) {
            scanf("%d", &data[i].cid[j]);
            visit[data[i].cid[j]] = true;
            Union(data[i].cid[j], data[i].id);
        }
        scanf("%d %d", &data[i].num, &data[i].area);
    }
    for(int i = 0; i < n; i++) {
        int id = find(data[i].id);
        ans[id].id = id;
        ans[id].num += data[i].num;
        ans[id].area += data[i].area;
        ans[id].flag = true;
    }
    for(int i = 0; i < 10000; i++) {
        if(visit[i])
            ans[find(i)].people++;
        if(ans[i].flag)
            cnt++;
    }
    for(int i = 0; i < 10000; i++) {
        if(ans[i].flag) {
            ans[i].num = (double)(ans[i].num * 1.0 / ans[i].people);
            ans[i].area = (double)(ans[i].area * 1.0 / ans[i].people);
        }
    }
    sort(ans, ans + 10000, cmp1);
    printf("%d\n", cnt);
    for(int i = 0; i < cnt; i++)
        printf("%04d %d %.3f %.3f\n", ans[i].id, ans[i].people, ans[i].num, ans[i].area);
    return 0;
}
```

## 1115 Counting Nodes in a BST (30 分)

翻译：给一棵BST，计算最后两层的节点总数。

思路：二叉树的遍历，dfs

答案：

```
#include <iostream>
#include <vector>
using namespace std;
struct node {
    int v;
    struct node *left, *right;
};
node* build(node *root, int v) {
    if(root == NULL) {
        root = new node();
        root->v = v;
        root->left = root->right = NULL;
    } else if(v <= root->v)
        root->left = build(root->left, v);
    else
        root->right = build(root->right, v);
    return root;
}
vector<int> num(1000);
int maxdepth = -1;
void dfs(node *root, int depth) {
    if(root == NULL) {
        maxdepth = max(depth, maxdepth);
        return ;
    }
    num[depth]++;
    dfs(root->left, depth + 1);
    dfs(root->right, depth + 1);
    
}
int main() {
    int n, t;
    scanf("%d", &n);
    node *root = NULL;
    for(int i = 0; i < n; i++) {
        scanf("%d", &t);
        root = build(root, t);
    }
    dfs(root, 0);
    printf("%d + %d = %d", num[maxdepth-1], num[maxdepth-2], num[maxdepth-1] + num[maxdepth-2]);
    return 0;
}
```

## 1116 Come on! Let's C (20 分)

翻译：第一名得到“神秘大奖”，素数名得到小黄人，其他得到巧克力。

思路：

map应用。

素数检测

答案：

```
#include <iostream>
#include <set>
#include <cmath>

using namespace std;
int ran[10000];

bool isprime(int a) {
    if(a <= 1) return false;
    int Sqrt = sqrt((double)a);
    for(int i = 2; i <= Sqrt; i++) {
        if(a % i == 0)
            return false;
    }
    return true;
}

int main() {

    int n, k;
    scanf("%d", &n); // 参赛人数 

    for(int i = 0; i < n; i++) {
        int id;
        scanf("%d", &id);
        ran[id] = i + 1; // 从1开始 
    }

    scanf("%d", &k); // k个查询 
    set<int> ss;
    
    for(int i = 0; i < k; i++) {
        int id;
        scanf("%d", &id);
        printf("%04d: ", id);
        if(ran[id] == 0) { // 不存在 
            printf("Are you kidding?\n");
            continue;
        }
        // 检测是否重复查询 
        if(ss.find(id) == ss.end()) {
            ss.insert(id);
        } else {
            printf("Checked\n");
            continue;
        }
        // 分别打印结果 
        if(ran[id] == 1) {
            printf("Mystery Award\n");
        }else if(isprime(ran[id])) {
            printf("Minion\n");
        }else {
            printf("Chocolate\n");
        }
    }
    return 0;
}
```

## 1117 Eddington Number (25 分)

翻译：E为E天骑车超过E英里。

思路：排序，逻辑题。

答案：

```
#include <iostream>
#include <algorithm>
using namespace std;
int a[1000000];
int main() {
    int n, e = 0;
    scanf("%d", &n);
    for(int i = 0; i < n; i++)
        scanf("%d", &a[i]);
    sort(a, a+n, greater<int>());
    while(e < n && a[e] > e+1) e++;
    printf("%d", e);
    return 0;
}
```

## 1118 Birds in Forest (25 分)

翻译：问两个鸟是否是在同一颗树上。

思路：并查集

答案：

```
#include <iostream>
using namespace std;
int n, m, k;
const int maxn = 10010;
int fa[maxn] = {0}, cnt[maxn] = {0};
int findFather(int x) {
    int a = x;
    while(x != fa[x])
        x = fa[x];
    while(a != fa[a]) {
        int z = a;
        a = fa[a];
        fa[z] = x;
    }
    return x;
}
void Union(int a, int b) {
    int faA = findFather(a);
    int faB = findFather(b);
    if(faA != faB) fa[faA] = faB;
}
bool exist[maxn];
int main() {
    scanf("%d", &n);
    for(int i = 1; i <= maxn; i++)
        fa[i] = i;
    int id, temp;
    for(int i = 0; i < n; i++) {
        scanf("%d%d", &k, &id);
        exist[id] = true;
        for(int j = 0; j < k-1; j++) {
            scanf("%d", &temp);
            Union(id, temp);
            exist[temp] = true;
        }
    }
    for(int i = 1; i <= maxn; i++) {
        if(exist[i] == true) {
            int root = findFather(i);
            cnt[root]++;
        }
    }
    int numTrees = 0, numBirds = 0;
    for(int i = 1; i <= maxn; i++) {
        if(exist[i] == true && cnt[i] != 0) {
            numTrees++;
            numBirds += cnt[i];
        }
    }
    printf("%d %d\n", numTrees, numBirds);
    scanf("%d", &m);
    int ida, idb;
    for(int i = 0; i < m; i++) {
        scanf("%d%d", &ida, &idb);
        printf("%s\n", (findFather(ida) == findFather(idb)) ? "Yes" : "No");
    }
    return 0;
}
```

## 1119 **Pre- and Post-order Traversals (30 分)

翻译：前序遍历与后序遍历不能确定一棵树，请你确定下，如果不唯一，输出no，再输出其中一个的中序遍历。

思路：树的遍历。

答案：

```
#include <iostream>
#include <vector>
using namespace std;
vector<int> in, pre, post;
bool unique = true;
void getIn(int preLeft, int preRight, int postLeft, int postRight) {
    if(preLeft == preRight) {
        in.push_back(pre[preLeft]);
        return;
    }
    if (pre[preLeft] == post[postRight]) {
        int i = preLeft + 1;
        while (i <= preRight && pre[i] != post[postRight-1]) i++;
        if (i - preLeft > 1)
            getIn(preLeft + 1, i - 1, postLeft, postLeft + (i - preLeft - 1) - 1);
        else
            unique = false;
        in.push_back(post[postRight]);
        getIn(i, preRight, postLeft + (i - preLeft - 1), postRight - 1);
    }
}
int main() {
    int n;
    scanf("%d", &n);
    pre.resize(n), post.resize(n);
    for (int i = 0; i < n; i++)
        scanf("%d", &pre[i]);
    for (int i = 0; i < n; i++)
        scanf("%d", &post[i]);
    getIn(0, n-1, 0, n-1);
    printf("%s\n%d", unique == true ? "Yes" : "No", in[0]);
    for (int i = 1; i < in.size(); i++)
        printf(" %d", in[i]);
    printf("\n");
    return 0;
}
```

## 1120 Friend Numbers (20 分)

翻译：把所有位数相加相同的称为朋友数字。查有多少个朋友数字，分别是什么。

思路：字符串转数字处理。map应用。

答案：

```
#include <iostream>
#include <set>
using namespace std;
int getFriendNum(int num) {
    int sum = 0;
    while(num != 0) {
        sum += num % 10;
        num /= 10;
    }
    return sum;
}
int main() {
    set<int> s;
    int n, num;
    scanf("%d", &n);
    for(int i = 0; i < n; i++) {
        scanf("%d", &num);
        s.insert(getFriendNum(num));
    }
    printf("%d\n", s.size());
    for(auto it = s.begin(); it != s.end(); it++) {
        if(it != s.begin()) printf(" ");
        printf("%d", *it);
    }
    return 0;
}
```

## 1121 Damn Single (25 分)

翻译：寻找单身的人。

思路：map应用，逻辑题。

答案：

```
#include <iostream>
#include <set>
#include <vector>3

using namespace std;

int main() {

    int n, a, b, m;
    scanf("%d", &n); // couple的对数 
    vector<int> couple(100000);
	
	// couple初始化 
    for (int i = 0; i < 100000; i++)
        couple[i] = -1;
	
	// couple互相标记 
    for (int i = 0; i < n; i++) {
        scanf("%d%d", &a, &b);
        couple[a] = b;
        couple[b] = a;
    }
	
	// m个查询 
    scanf("%d", &m);

    vector<int> guest(m), isExist(100000);
	
	// 首先标记一遍有配偶的人的配偶标记为1 
    for (int i = 0; i < m; i++) {
        scanf("%d", &guest[i]);
        if (couple[guest[i]] != -1)
            isExist[couple[guest[i]]] = 1;
    }
    set<int> s;
	
	// 找出所有没有配偶的 
    for (int i = 0; i < m; i++)
        if (!isExist[guest[i]]) s.insert(guest[i]);
    printf("%d\n", s.size());
	
	// 打印所有没有配偶的 
    for (auto it = s.begin(); it != s.end(); it++) {
        if (it != s.begin()) printf(" ");
        printf("%05d", *it);
    }

    return 0;
}
```

## 1122 **Hamiltonian Cycle (25 分)

翻译：给出一个图，判断给定的路径是不是哈密尔顿路径

思路：不知道考点。

答案：

```
#include <iostream>
#include <set>
#include <vector>
using namespace std;
int main() {
    int n, m, cnt, k, a[210][210] = {0};
    cin >> n >> m;
    for(int i = 0; i < m; i++) {
        int t1, t2;
        scanf("%d%d", &t1, &t2);
        a[t1][t2] = a[t2][t1] = 1;
    }
    cin >> cnt;
    while(cnt--) {
        cin >> k;
        vector<int> v(k);
        set<int> s;
        int flag1 = 1, flag2 = 1;
        for(int i = 0; i < k; i++) {
            scanf("%d", &v[i]);
            s.insert(v[i]);
        }
        if(s.size() != n || k - 1 != n || v[0] != v[k-1]) flag1 = 0;
        for(int i = 0; i < k - 1; i++)
            if(a[v[i]][v[i+1]] == 0) flag2 = 0;
        printf("%s",flag1 && flag2 ? "YES\n" : "NO\n");
    }
    return 0;
}
```

## 1123 **Is It a Complete AVL Tree (30 分)

翻译：给数据，插入为AVL树，并输出其层序排列，并判断是不是完全二叉树。

思路：AVL树，层序遍历，完全二叉树。

较为综合的题目。自己做一遍。

答案：

```
#include <iostream>
#include <vector>
#include <queue>
using namespace std;
struct node {
    int val;
    struct node *left, *right;
};
node* leftRotate(node *tree) {
    node *temp = tree->right;
    tree->right = temp->left;
    temp->left = tree;
    return temp;
}
node* rightRotate(node *tree) {
    node *temp = tree->left;
    tree->left = temp->right;
    temp->right = tree;
    return temp;
}
node* leftRightRotate(node *tree) {
    tree->left = leftRotate(tree->left);
    return rightRotate(tree);
}
node* rightLeftRotate(node *tree) {
    tree->right = rightRotate(tree->right);
    return leftRotate(tree);
}
int getHeight(node *tree) {
    if (tree == NULL) return 0;
    int l = getHeight(tree->left);
    int r = getHeight(tree->right);
    return max(l, r) + 1;
}
node* insert(node *tree, int val) {
    if (tree == NULL) {
        tree = new node();
        tree->val = val;
    }else if (tree->val > val) {
        tree->left = insert(tree->left, val);
        int l = getHeight(tree->left), r = getHeight(tree->right);
        if (l - r >= 2) {
            if (val < tree->left->val)
                tree = rightRotate(tree);
            else
                tree = leftRightRotate(tree);
        }
    } else {
        tree->right = insert(tree->right, val);
        int l = getHeight(tree->left), r = getHeight(tree->right);
        if (r - l >= 2) {
            if (val > tree->right->val)
                tree = leftRotate(tree);
            else
                tree = rightLeftRotate(tree);
        }
    }
    return tree;
}
int isComplete = 1, after = 0;
vector<int> levelOrder(node *tree) {
    vector<int> v;
    queue<node *> queue;
    queue.push(tree);
    while (!queue.empty()) {
        node *temp = queue.front();
        queue.pop();
        v.push_back(temp->val);
        if (temp->left != NULL) {
            if (after) isComplete = 0;
            queue.push(temp->left);
        } else {
            after = 1;
        }
        if (temp->right != NULL) {
            if (after) isComplete = 0;
            queue.push(temp->right);
        } else {
            after = 1;
        }
    }
    return v;
}
int main() {
    int n, temp;
    scanf("%d", &n);
    node *tree = NULL;
    for (int i = 0; i < n; i++) {
        scanf("%d", &temp);
        tree = insert(tree, temp);
    }
    vector<int> v = levelOrder(tree);
    for (int i = 0; i < v.size(); i++) {
        if (i != 0) printf(" ");
        printf("%d", v[i]);
    }
    printf("\n%s", isComplete ? "YES" : "NO");
    return 0;
}
```

## 1124 Raffle for Weibo Followers (20 分)

翻译：微博抽奖，每隔几个人选一个中奖的。

思路：map应用

答案：

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

## 1125 Chain the Ropes (25 分)

翻译：先加入的绳子需要对折。

思路：读懂题目

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
    for (int i = 0; i < n; i++)
        scanf("%d", &v[i]);
    sort(v.begin(), v.end());
    int result = v[0];
    for (int i = 1; i < n; i++)
        result = (result + v[i]) / 2;
    printf("%d", result);
    return 0;
}
```

## 1126 **Eulerian Path (25 分)

翻译：判断是否是Eulerian, semi-Eulerian, 还是 non-Eulerian.

思路：

理解题意。

Eulerian：所有节点有偶的度

semi-Eulerian：除了两个结点的度是奇数其他都是偶数

答案：

```
#include <iostream>
#include <vector>

using namespace std;
vector<vector<int> > v;
vector<bool> visit;
int cnt = 0;

void dfs(int index) {
    visit[index] = true;
    cnt++;
    for (int i = 0; i < v[index].size(); i++)
        if (visit[v[index][i]] == false)
            dfs(v[index][i]);
}

int main() {

    int n, m, a, b, even = 0;
    scanf("%d%d", &n, &m); // 节点数，边的数 

    v.resize(n + 1);
    visit.resize(n + 1);
	
	// 输入图 
    for (int i = 0; i < m; i++) {
        scanf("%d%d", &a, &b); // 两个节点，双向边 
        v[a].push_back(b);
        v[b].push_back(a);
    }
	
	// 依照升序打印节点的度 
    for (int i = 1; i <= n; i++) {
        if (i != 1) printf(" ");
        printf("%d", v[i].size());
        if (v[i].size() % 2 == 0) even++; // 记录度为偶数的节点数 
    }

    printf("\n");
	
	// 遍历，记录有连接的节点数 
    dfs(1);

    if (even == n && cnt == n)
        printf("Eulerian");
    else if(even == n - 2 && cnt == n)
        printf("Semi-Eulerian");
    else
        printf("Non-Eulerian"); // 不是连通图也是Non-Eulerian 

    return 0;
}
```


## 1127 **ZigZagging on a Tree (30 分)

翻译：对一棵树迂回层序遍历。

思路：中间进行保存。树的遍历。

1. 中序后序构建出树

2. 层序遍历

3. 每层一个数组，分为奇层与偶层

答案：

```
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> in, post, result[35];
int n, tree[35][2], root;

struct node {
    int index, depth;
};

// 中序：左根右 后序：左右根 
// 注意index为引用，直接改变的tree与root的值了 
void dfs(int &index, int inLeft, int inRight, int postLeft, int postRight) {
    if (inLeft > inRight) return;
    index = postRight; // 后序中的根 
    int i = 0;
    while (in[i] != post[postRight]) i++; // 通过后序中的根找到中序中的根
	// 遍历左子树 
    dfs(tree[index][0], inLeft, i - 1, postLeft, postLeft + (i - inLeft) - 1);
    // 遍历右子树 
	dfs(tree[index][1], i + 1, inRight, postLeft + (i - inLeft), postRight - 1);
}

// 层序遍历 
void bfs() {
    queue<node> q;
    q.push(node{root, 0});
    while (!q.empty()) {
        node temp = q.front();
        q.pop();
        
        // 每一层是一个vector 
        result[temp.depth].push_back(post[temp.index]);
        
        if (tree[temp.index][0] != 0)
            q.push(node{tree[temp.index][0], temp.depth + 1});
        if (tree[temp.index][1] != 0)
            q.push(node{tree[temp.index][1], temp.depth + 1});
    }
}

int main() {
	
    cin >> n; // 序列长度 
    
    // 输入中序序列与后序序列 
    in.resize(n + 1), post.resize(n + 1);
    for (int i = 1; i <= n; i++) cin >> in[i];  
    for (int i = 1; i <= n; i++) cin >> post[i];
    
    // 通过两个序列构建出树 
    dfs(root, 1, n, 1, n);
    
    // 层序遍历 
	bfs();
    
	printf("%d", result[0][0]); // 根 
    for (int i = 1; i < 35; i++) {
        if (i % 2 == 1) { // 奇数行 
            for (int j = 0; j < result[i].size(); j++)
                printf(" %d", result[i][j]);
        } else { // 偶数行
            for (int j = result[i].size() - 1; j >= 0; j--)
                printf(" %d", result[i][j]);
        }
    }
    return 0;
}
```

## 1128 N Queens Puzzle (20 分)

翻译：八皇后问题，皇后要不同行，不同列，与不同对角。问给出的数据是否符合。

思路：

已知不同列

判断是否同行与同对角。

abs的应用

答案：

```
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;
int main() {
    int k, n;
    cin >> k;
    for (int i = 0; i < k; i++) {
        cin >> n;
        vector<int> v(n);
        bool result = true;
        for (int j = 0; j < n; j++) {
            cin >> v[j];
            for (int t = 0; t < j; t++) {
                if (v[j] == v[t] || abs(v[j]-v[t]) == abs(j-t)) {
                    result = false;
                    break;
                }
            }
        }
        cout << (result == true ? "YES\n" : "NO\n");
    }
    return 0;
}
```

## 1129 **Recommendation System (25 分)

翻译：根据查询次数和index显示推荐。

思路：记录与比较

柳神采用set，理解下，看下自己有没有什么想法。

答案：

```
#include <cstdio>
#include <set>
using namespace std;
int book[50001];
struct node {
    int value, cnt;
    node(int a, int b):value(a), cnt(b){}
    bool operator < (const node &a) const {
        return (cnt != a.cnt) ? cnt > a.cnt : value < a.value;
    }
};
int main() {
    int n, k, num;
    scanf("%d%d", &n, &k);
    set<node> s;
    for (int i = 0; i < n; i++) {
        scanf("%d", &num);
        if (i != 0) {
            printf("%d:", num);
            int tempCnt = 0;
            for(auto it = s.begin(); tempCnt < k && it != s.end(); it++) {
                printf(" %d", it->value);
                tempCnt++;
            }
            printf("\n");
        }
        auto it = s.find(node(num, book[num]));
        if (it != s.end()) s.erase(it);
        book[num]++;
        s.insert(node(num, book[num]));
    }
    return 0;
}
```

## 1130 Infix Expression (25 分)

翻译：输出中缀表达式

思路：dfs，树的遍历。

答案：

```
#include <iostream>

using namespace std;

struct node {
    string data;
    int l, r;
} a[100];

string dfs(int root) {
	// 没有左右子树 
    if(a[root].l == -1 && a[root].r == -1) return a[root].data;
    // 只有右子树 // data为符号的情况 // 没有只有左子树的情况 
	if(a[root].l == -1 && a[root].r != -1)  return "(" +  a[root].data + dfs(a[root].r) + ")";
    // 左右子树都有的情况 
	if(a[root].l != -1 && a[root].r != -1) return "(" +  dfs(a[root].l) + a[root].data + dfs(a[root].r) + ")";
}

int main() {

    int have[100] = {0}, n, root = 1;
    cin >> n; // 总节点数 
	
	// 输入树 
    for(int i  = 1; i <= n; i++) {
        cin >> a[i].data >> a[i].l >> a[i].r;
        if(a[i].l != -1) have[a[i].l] = 1;
        if(a[i].r != -1) have[a[i].r] = 1;
    }
	
	// 找到根节点 
    while(have[root] == 1) root++;
	
	// 遍历 
    string ans = dfs(root);
	
	// 最外层的括号，去除 
    if(ans[0] == '(') ans = ans.substr(1,ans.size()-2);

    cout << ans;

    return 0;
}
```

## 1131 **Subway Map (30 分)

翻译：找出一条路线，使得对任何给定的起点和终点，可以找出中途经停站最少的路线；如果经停站一样多，则取需要换乘线路次数最少的路线

思路：图的遍历，DFS。

答案：

```
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
vector<vector<int>> v(10000);
int visit[10000], minCnt, minTransfer, start, end1;
unordered_map<int, int> line;
vector<int> path, tempPath;
int transferCnt(vector<int> a) {
    int cnt = -1, preLine = 0;
    for (int i = 1; i < a.size(); i++) {
        if (line[a[i-1]*10000+a[i]] != preLine) cnt++;
        preLine = line[a[i-1]*10000+a[i]];
    }
    return cnt;
}
void dfs(int node, int cnt) {
    if (node == end1 && (cnt < minCnt || (cnt == minCnt && transferCnt(tempPath) < minTransfer))) {
        minCnt = cnt;
        minTransfer = transferCnt(tempPath);
        path = tempPath;
    }
    if (node == end1) return;
    for (int i = 0; i < v[node].size(); i++) {
        if (visit[v[node][i]] == 0) {
            visit[v[node][i]] = 1;
            tempPath.push_back(v[node][i]);
            dfs(v[node][i], cnt + 1);
            visit[v[node][i]] = 0;
            tempPath.pop_back();
        }
    }
}
int main() {
    int n, m, k, pre, temp;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d%d", &m, &pre);
        for (int j = 1; j < m; j++) {
            scanf("%d", &temp);
            v[pre].push_back(temp);
            v[temp].push_back(pre);
            line[pre*10000+temp] = line[temp*10000+pre] = i + 1;
            pre = temp;
        }
    }
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        scanf("%d%d", &start, &end1);
        minCnt = 99999, minTransfer = 99999;
        tempPath.clear();
        tempPath.push_back(start);
        visit[start] = 1;
        dfs(start, 0);
        visit[start] = 0;
        printf("%d\n", minCnt);
        int preLine = 0, preTransfer = start;
        for (int j = 1; j < path.size(); j++) {
            if (line[path[j-1]*10000+path[j]] != preLine) {
                if (preLine != 0) printf("Take Line#%d from %04d to %04d.\n", preLine, preTransfer, path[j-1]);
                preLine = line[path[j-1]*10000+path[j]];
                preTransfer = path[j-1];
            }
        }
        printf("Take Line#%d from %04d to %04d.\n", preLine, preTransfer, end1);
    }
    return 0;
}
```

## 1132 Cut Integer (20 分)

翻译：从中间砍一半再除，是否能除的净

思路：数字转字符串，字符串转数字。

答案：

```
#include <iostream>
using namespace std;
int main() {
    int n, num;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &num);
        string s = to_string(num);
        int len = s.length();
        int a = stoi(s.substr(0, len/2));
        int b = stoi(s.substr(len/2));
        if (a * b != 0 && num % (a * b) == 0)
            printf("Yes\n");
        else
            printf("No\n");
    }
    return 0;
}
```

## 1133 Splitting A Linked List (25 分)

翻译：首先负数，之后0到k，最后剩下的。

思路：

分成不同的区间排序，push进vector，再按顺序输出。

答案：

```
#include <iostream>
#include <vector>

using namespace std;

struct node {
    int id, data, next;
};

int main() {

    int begin, n, k, s, d, e;
    scanf("%d%d%d", &begin, &n, &k); // 初始地址，总节点数，k区间 

    node a[100010];
    vector<node> v, ans;

    for (int i = 0; i < n; i++) {
        scanf("%d%d%d", &s, &d, &e); // address data next 
        a[s] = {s, d, e};
    }
	
	// 链表按顺序压入v 
    for (; begin != -1; begin = a[begin].next)
        v.push_back(a[begin]);
	
	// 首先是小于0的 
    for (int i = 0; i < v.size(); i++)
        if (v[i].data < 0) ans.push_back(v[i]);
	
	// 接下来为0到k之间 
    for (int i = 0; i < v.size(); i++)
        if (v[i].data >= 0 && v[i].data <= k) ans.push_back(v[i]);
	
	// 接下来是大于k的 
    for (int i = 0; i < v.size(); i++)
        if (v[i].data > k) ans.push_back(v[i]);
	
	// 打印结果 
    for (int i = 0; i < ans.size() - 1; i++)
        printf("%05d %d %05d\n", ans[i].id, ans[i].data, ans[i + 1].id);
	// 最后一个节点 
    printf("%05d %d -1\n", ans[ans.size() - 1].id, ans[ans.size() - 1].data);
    return 0;
}
```

## 1134 **Vertex Cover (25 分)

翻译：给n个结点m条边，再给k个集合。对这k个集合逐个进行判断。每个集合S里面的数字都是结点编号，求问整个图所有的m条边两端的结点，是否至少一个结点出自集合S中。如果是，输出Yes否则输出No

思路：map应用。图遍历。

题有点没读懂。

答案：

```
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, m, k, nv, a, b, num;
    scanf("%d%d", &n, &m);
    vector<int> v[n];
    for (int i = 0;i < m; i++) {
        scanf("%d%d", &a, &b);
        v[a].push_back(i);
        v[b].push_back(i);
    }
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        scanf("%d", &nv);
        int flag = 0;
        vector<int> hash(m, 0);
        for (int j = 0; j < nv; j++) {
            scanf("%d", &num);
            for (int t = 0; t < v[num].size(); t++)
                hash[v[num][t]] = 1;
        }
        for (int j = 0; j < m; j++) {
            if (hash[j] == 0) {
                printf("No\n");
                flag = 1;
                break;
            }
        }
        if (flag == 0) printf("Yes\n");
    }
    return 0;
}
```

## 1135 **Is It A Red-Black Tree (30 分)

翻译：判断是否是红黑树。

思路：读懂题意。

答案：

```
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;
vector<int> arr;
struct node {
    int val;
    struct node *left, *right;
};
node* build(node *root, int v) {
    if(root == NULL) {
        root = new node();
        root->val = v;
        root->left = root->right = NULL;
    } else if(abs(v) <= abs(root->val))
        root->left = build(root->left, v);
    else
        root->right = build(root->right, v);
    return root;
}
bool judge1(node *root) {
    if (root == NULL) return true;
    if (root->val < 0) {
        if (root->left != NULL && root->left->val < 0) return false;
        if (root->right != NULL && root->right->val < 0) return false;
    }
    return judge1(root->left) && judge1(root->right);
}
int getNum(node *root) {
    if (root == NULL) return 0;
    int l = getNum(root->left);
    int r = getNum(root->right);
    return root->val > 0 ? max(l, r) + 1 : max(l, r);
}
bool judge2(node *root) {
    if (root == NULL) return true;
    int l = getNum(root->left);
    int r = getNum(root->right);
    if(l != r) return false;
    return judge2(root->left) && judge2(root->right);
}
int main() {
    int k, n;
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        scanf("%d", &n);
        arr.resize(n);
        node *root = NULL;
        for (int j = 0; j < n; j++) {
            scanf("%d", &arr[j]);
            root = build(root, arr[j]);
        }
        if (arr[0] < 0 || judge1(root) == false || judge2(root) == false)
            printf("No\n");
        else
            printf("Yes\n");
    }
    return 0;
}
```

## 1136 A Delayed Palindrome (20 分)

翻译：判断是否是回文数。

思路：字符串与数字转化。

答案：

```
#include <iostream>
#include <algorithm>

using namespace std;

// 翻转 
string rev(string s) {
    reverse(s.begin(), s.end());
    return s;
}

// 两数相加 （大整数加法）
string add(string s1, string s2) {
    string s = s1;
    int carry = 0;
    for (int i = s1.size() - 1; i >= 0; i--) {
        s[i] = (s1[i] - '0' + s2[i] - '0' + carry) % 10 + '0'; // - '0' 变为int + '0' 变为char 
        carry = (s1[i] - '0' + s2[i] - '0' + carry) / 10; // 进位 
    }
    if (carry > 0) s = "1" + s;
    return s;
}

int main() {
	
    string s, sum;
    int n = 10;
    cin >> s; // 初始数字 
    
	if (s == rev(s)) {
        cout << s << " is a palindromic number.\n";
        return 0;
    }
    
	while (n--) {
        sum = add(s, rev(s));
        cout << s << " + " << rev(s) << " = " << sum << endl;
        if (sum == rev(sum)) {
            cout << sum << " is a palindromic number.\n";
            return 0;
        }
        s = sum;
    }
    cout << "Not found in 10 iterations.\n";
    return 0;
}
```

## 1137 Final Grading (25 分)

翻译：算MOOC的总分。

思路：排序应用。

答案：

```
#include <iostream>
#include <algorithm>
#include <vector>
#include <map>
using namespace std;
struct node {
    string name;
    int gp, gm, gf, g;
};
bool cmp(node a, node b) {
    return a.g != b.g ? a.g > b.g : a.name < b.name;
}
map<string, int> idx;
int main() {
    int p, m, n, score, cnt = 1;
    cin >> p >> m >> n;
    vector<node> v, ans;
    string s;
    for (int i = 0; i < p; i++) {
        cin >> s >> score;
        if (score >= 200) {
            v.push_back(node{s, score, -1, -1, 0});
            idx[s] = cnt++;
        }
    }
    for (int i = 0; i < m; i++) {
        cin >> s >> score;
        if (idx[s] != 0) v[idx[s] - 1].gm = score;
    }
    for (int i = 0; i < n; i++) {
        cin >> s >> score;
        if (idx[s] != 0) {
            int temp = idx[s] - 1;
            v[temp].gf = v[temp].g = score;
            if (v[temp].gm > v[temp].gf) v[temp].g = int(v[temp].gm * 0.4 + v[temp].gf * 0.6 + 0.5);
        }
    }
    for (int i = 0; i < v.size(); i++)
        if (v[i].g >= 60) ans.push_back(v[i]);
    sort(ans.begin(), ans.end(), cmp);
    for (int i = 0; i < ans.size(); i++)
        printf("%s %d %d %d %d\n", ans[i].name.c_str(), ans[i].gp, ans[i].gm, ans[i].gf, ans[i].g);
    return 0;
}
```

## 1138 Postorder Traversal (25 分)

翻译：前序中序转后序

思路：前序中序转后序，树的遍历

答案：

```
#include <iostream>
#include <vector>
using namespace std;
vector<int> pre, in;
bool flag = false;
void postOrder(int prel, int inl, int inr) {
    if (inl > inr || flag == true) return;
    int i = inl;
    while (in[i] != pre[prel]) i++;
    postOrder(prel+1, inl, i-1);
    postOrder(prel+i-inl+1, i+1, inr);
    if (flag == false) {
        printf("%d", in[i]);
        flag = true;
    }
}
int main() {
    int n;
    scanf("%d", &n);
    pre.resize(n);
    in.resize(n);
    for (int i = 0; i < n; i++) scanf("%d", &pre[i]);
    for (int i = 0; i < n; i++) scanf("%d", &in[i]);
    postOrder(0, 0, n-1);
    return 0;
}
```

## 1139 **First Contact (30 分)

翻译：

思路：没理解题意，无法分类。

答案：

```
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;
unordered_map<int, bool> arr;
struct node {
    int a, b;
};
bool cmp(node x, node y) {
    return x.a != y.a ? x.a < y.a : x.b < y.b;
}
int main() {
    int n, m, k;
    scanf("%d%d", &n, &m);
    vector<int> v[10000];
    for (int i = 0; i < m; i++) {
        string a, b;
        cin >> a >> b;
        if (a.length() == b.length()) {
            v[abs(stoi(a))].push_back(abs(stoi(b)));
            v[abs(stoi(b))].push_back(abs(stoi(a)));
        }
        arr[abs(stoi(a)) * 10000 + abs(stoi(b))] = arr[abs(stoi(b)) * 10000 + abs(stoi(a))] = true;
    }
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        int c, d;
        cin >> c >> d;
        vector<node> ans;
        for (int j = 0; j < v[abs(c)].size(); j++) {
            for (int k = 0; k < v[abs(d)].size(); k++) {
                if (v[abs(c)][j] == abs(d) || abs(c) == v[abs(d)][k]) continue;
                if (arr[v[abs(c)][j] * 10000 + v[abs(d)][k]] == true)
                    ans.push_back(node{v[abs(c)][j], v[abs(d)][k]});
            }
        }
        sort(ans.begin(), ans.end(), cmp);
        printf("%d\n", int(ans.size()));
        for(int j = 0; j < ans.size(); j++)
            printf("%04d %04d\n", ans[j].a, ans[j].b);
    }
    return 0;
}
```

## 1140 Look-and-say Sequence (20 分)

翻译：给两个数字D和n，第一个序列是D，后一个序列描述前一个序列的所有数字以及这个数字出现的次数，比如D出现了1次，那么第二个序列就是D1，对于第二个序列D1，第三个序列这样描述：D出现1次，1出现1次，所以是D111……以此类推，输出第n个序列

思路：按照题意那样做。

答案：

```
#include <iostream>
using namespace std;
int main() {
    string s;
    int n, j;
    cin >> s >> n;
    for (int cnt = 1; cnt < n; cnt++) {
        string t;
        for (int i = 0; i < s.length(); i = j) {
            for (j = i; j < s.length() && s[j] == s[i]; j++);
            t += s[i] + to_string(j - i);
        }
        s = t;
    }
    cout << s;
    return 0;
}
```

## 1141 PAT Ranking of Institutions (25 分)

翻译：各个学校的排名

思路：排序题。

答案：

```
#include <iostream>
#include <algorithm>
#include <cctype>
#include <vector>
#include <unordered_map>
using namespace std;
struct node {
    string school;
    int tws, ns;
};
bool cmp(node a, node b) {
    if (a.tws != b.tws)
        return a.tws > b.tws;
    else if (a.ns != b.ns)
        return a.ns < b.ns;
    else
        return a.school < b.school;
}
int main() {
    int n;
    scanf("%d", &n);
    unordered_map<string, int> cnt;
    unordered_map<string, double> sum;
    for (int i = 0; i < n; i++) {
        string id, school;
        cin >> id;
        double score;
        scanf("%lf", &score);
        cin >> school;
        for (int j = 0; j < school.length(); j++)
            school[j] = tolower(school[j]);
        if (id[0] == 'B')
            score = score / 1.5;
        else if (id[0] == 'T')
            score = score * 1.5;
        sum[school] += score;
        cnt[school]++;
    }
    vector<node> ans;
    for (auto it = cnt.begin(); it != cnt.end(); it++)
        ans.push_back(node{it->first, (int)sum[it->first], cnt[it->first]});
    sort(ans.begin(), ans.end(), cmp);
    int rank = 0, pres = -1;
    printf("%d\n", (int)ans.size());
    for (int i = 0; i < ans.size(); i++) {
        if (pres != ans[i].tws) rank = i + 1;
        pres = ans[i].tws;
        printf("%d ", rank);
        cout << ans[i].school;
        printf(" %d %d\n", ans[i].tws, ans[i].ns);
    }
    return 0;
}
```

## 1142 **Maximal Clique (25 分)

翻译：

思路：

答案：

```
#include <iostream>
#include <vector>
using namespace std;
int e[210][210];
int main() {
    int nv, ne, m, ta, tb, k;
    scanf("%d %d", &nv, &ne);
    for (int i = 0; i < ne; i++) {
        scanf("%d %d", &ta, &tb);
        e[ta][tb] = e[tb][ta] = 1;
    }
    scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        scanf("%d", &k);
        vector<int> v(k);
        int hash[210] = {0}, isclique = 1, isMaximal = 1;
        for (int j = 0; j < k; j++) {
            scanf("%d", &v[j]);
            hash[v[j]] = 1;
        }
        for (int j = 0; j < k; j++) {
            if (isclique == 0) break;
            for (int l = j + 1; l < k; l++) {
                if (e[v[j]][v[l]] == 0) {
                    isclique = 0;
                    printf("Not a Clique\n");
                    break;
                }
            }
        }
        if (isclique == 0) continue;
        for (int j = 1; j <= nv; j++) {
            if (hash[j] == 0) {
                for (int l = 0; l < k; l++) {
                    if (e[v[l]][j] == 0) break;
                    if (l == k - 1) isMaximal = 0;
                }
            }
            if (isMaximal == 0) {
                printf("Not Maximal\n");
                break;
            }
        }
        if (isMaximal == 1) printf("Yes\n");
    }
    return 0;
}
```

## 1143 **Lowest Common Ancestor (30 分)

翻译：给出一棵二叉搜索树的前序遍历，问结点u和v的共同最低祖先是谁

思路：

答案：

```
#include <iostream>
#include <vector>
#include <map>
using namespace std;
map<int, bool> mp;
int main() {
    int m, n, u, v, a;
    scanf("%d %d", &m, &n);
    vector<int> pre(n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &pre[i]);
        mp[pre[i]] = true;
    }
    for (int i = 0; i < m; i++) {
        scanf("%d %d", &u, &v);
        for(int j = 0; j < n; j++) {
            a = pre[j];
            if ((a >= u && a <= v) || (a >= v && a <= u)) break;
        } 
        if (mp[u] == false && mp[v] == false)
            printf("ERROR: %d and %d are not found.\n", u, v);
        else if (mp[u] == false || mp[v] == false)
            printf("ERROR: %d is not found.\n", mp[u] == false ? u : v);
        else if (a == u || a == v)
            printf("%d is an ancestor of %d.\n", a, a == u ? v : u);
        else
            printf("LCA of %d and %d is %d.\n", u, v, a);
    }
    return 0;
}
```

## 1144 The Missing Number (20 分)

翻译：寻找最小的失踪的正整数。

思路：map应用

答案：

```
#include <iostream>
#include <map>
using namespace std;
int main() {
    int n, a, num = 0;
    cin >> n;
    map<int, int> m;
    for (int i = 0; i < n; i++) {
        cin >> a;
        m[a]++;
    }
    while(++num)
        if (m[num] == 0) break;
    cout << num;
    return 0;
}
```

## 1145 Hashing - Average Search Time (25 分)

翻译：给定一个序列，用平方探测法解决哈希冲突，然后给出m个数字，如果这个数字不能够被插入就输出”X cannot be inserted.”，然后输出这m个数字的平均查找时间

思路：hash，平方探测法。

答案：

```
#include <iostream>
#include <vector>
using namespace std;
bool isprime(int n) {
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}
int main() {
    int tsize, n, m, a;
    scanf("%d %d %d", &tsize, &n, &m);
    while(!isprime(tsize)) tsize++;
    vector<int> v(tsize);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a);
        int flag = 0;
        for (int j = 0; j < tsize; j++) {
            int pos = (a + j * j) % tsize;
            if (v[pos] == 0) {
                v[pos] = a;
                flag = 1;
                break;
            }
        }
        if (!flag) printf("%d cannot be inserted.\n", a);
    }
    int ans = 0;
    for (int i = 0; i < m; i++) {
        scanf("%d", &a);
        for (int j = 0; j <= tsize; j++) {
            ans++;
            int pos = (a + j * j) % tsize;
            if (v[pos] == a || v[pos] == 0) break;
        }
    }
    printf("%.1lf\n", ans * 1.0 / m);
    return 0;
}
```

## 1146 Topological Order (25 分)

翻译：给一个有向图，判断给定序列是否是拓扑序列

思路：拓扑序列

答案：

```
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, m, a, b, k, flag = 0, in[1010];
    vector<int> v[1010];
    scanf("%d %d", &n, &m);
    for (int i = 0; i < m; i++) {
        scanf("%d %d", &a, &b);
        v[a].push_back(b);
        in[b]++;
    }
    scanf("%d", &k);
    for (int i = 0; i < k; i++) {
        int judge = 1;
        vector<int> tin(in, in+n+1);
        for (int j = 0; j < n; j++) {
            scanf("%d", &a);
            if (tin[a] != 0) judge = 0;
            for (int it : v[a]) tin[it]--;
        }
        if (judge == 1) continue;
        printf("%s%d", flag == 1 ? " ": "", i);
        flag = 1;
    }
    return 0;
}
```

## 1147 Heaps (30 分)

翻译：给一个树的层序遍历，判断它是不是堆，是大顶堆还是小顶堆。输出这个树的后序遍历

思路：

给你层序遍历序列，判断是否是堆

如果是，输出堆的后序遍历

答案：

```
#include <iostream>
#include <vector>
using namespace std;
int m, n;
vector<int> v;
void postOrder(int index) {
    if (index >= n) return;
    postOrder(index * 2 + 1);
    postOrder(index * 2 + 2);
    printf("%d%s", v[index], index == 0 ? "\n" : " ");
}
int main() {
    scanf("%d%d", &m, &n);
    v.resize(n);
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) scanf("%d", &v[j]);
        int flag = v[0] > v[1] ? 1 : -1;
        for (int j = 0; j <= (n-1) / 2; j++) {
            int left = j * 2 + 1, right = j * 2 + 2;
            if (flag == 1 && (v[j] < v[left] || (right < n && v[j] < v[right]))) flag = 0;
            if (flag == -1 && (v[j] > v[left] || (right < n && v[j] > v[right]))) flag = 0;
        }
        if (flag == 0) printf("Not Heap\n");
        else printf("%s Heap\n", flag == 1 ? "Max" : "Min");
        postOrder(0);
    }
    return 0;
}
```

## 1148 **Werewolf - Simple Version (20 分)

翻译：已知 N 名玩家中有 2 人扮演狼人角色，有 2 人说的不是实话，有狼人撒谎但并不是所有狼人都在撒谎。要求你找出扮演狼人角色的是哪几号玩家，如果有解，在一行中按递增顺序输出 2 个狼人的编号；如果解不唯一，则输出最小序列解；若无解则输出 No Solution

思路：逻辑题，据说当时难倒了好多人。

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

## 1149 Dangerous Goods Packaging (25 分)

翻译：不相容的货物不能放在一起

思路：map应用，逻辑题。

与1121是相同的题型

答案：

```
#include <iostream>
#include <vector>
#include <map>

using namespace std;

int main() {

    int n, k, t1, t2;
    map<int,vector<int>> m;

    scanf("%d%d", &n, &k); // 不相容产品的对数，货品组的个数 
	
	// 互相标记不相容的产品 
    for (int i = 0; i < n; i++) {
        scanf("%d%d", &t1, &t2);
        m[t1].push_back(t2);
        m[t2].push_back(t1);
    }

    while (k--) {
        int cnt, flag = 0, a[100000] = { 0 };
        scanf("%d", &cnt); // 这组货的个数 
        vector<int> v(cnt);
        // 首先标记有可能的违禁品
        for (int i = 0; i < cnt; i++) {
            scanf("%d", &v[i]);
            a[v[i]] = 1;
        }
        // 对每个货物 // 在清单中查找是否有不相容的 
        for (int i = 0; i < v.size(); i++)
            for (int j = 0; j < m[v[i]].size(); j++)
                if (a[m[v[i]][j]] == 1) flag = 1;
        printf("%s\n",flag ? "No" :"Yes");
    }

    return 0;
}
```

## 1150 Travelling Salesman Problem (25 分)

翻译：给出一条路径，判断这条路径是这个图的旅行商环路、简单旅行商环路还是非旅行商环路

思路：图论

答案：

```
#include <iostream>
#include <vector>
#include <set>
using namespace std;
int e[300][300], n, m, k, ans = 99999999, ansid;
vector<int> v;
void check(int index) {
    int sum = 0, cnt, flag = 1;
    scanf("%d", &cnt);
    set<int> s;
    vector<int> v(cnt);
    for (int i = 0; i < cnt; i++) {
        scanf("%d", &v[i]);
        s.insert(v[i]);
    }
    for (int i = 0; i < cnt - 1; i++) {
        if(e[v[i]][v[i+1]] == 0) flag = 0;
        sum += e[v[i]][v[i+1]];
    }
    if (flag == 0) {
        printf("Path %d: NA (Not a TS cycle)\n", index);
    } else if(v[0] != v[cnt-1] || s.size() != n) {
        printf("Path %d: %d (Not a TS cycle)\n", index, sum);
    } else if(cnt != n + 1) {
        printf("Path %d: %d (TS cycle)\n", index, sum);
        if (sum < ans) {
            ans = sum;
            ansid = index;
        }
    } else {
        printf("Path %d: %d (TS simple cycle)\n", index, sum);
        if (sum < ans) {
            ans = sum;
            ansid = index;
        }
    }
}
int main() {
    scanf("%d%d", &n, &m);
    for (int i = 0; i < m; i++) {
        int t1, t2, t;
        scanf("%d%d%d", &t1, &t2, &t);
        e[t1][t2] = e[t2][t1] = t;
    }
    scanf("%d", &k);
    for (int i = 1; i <= k; i++) check(i);
    printf("Shortest Dist(%d) = %d\n", ansid, ans);
    return 0;
}
```

## 1151 LCA in a Binary Tree (30 分)

翻译：The lowest common ancestor

给出中序序列和先序序列，再给出两个点，求这两个点的最近公共祖先

思路：1143 **Lowest Common Ancestor (30 分)

树，中序序列，先序序列。

答案：

```
#include <iostream>
#include <vector>
#include <map>
using namespace std;
map<int, int> pos;
vector<int> in, pre;
void lca(int inl, int inr, int preRoot, int a, int b) {
    if (inl > inr) return;
    int inRoot = pos[pre[preRoot]], aIn = pos[a], bIn = pos[b];
    if (aIn < inRoot && bIn < inRoot)
        lca(inl, inRoot-1, preRoot+1, a, b);
    else if ((aIn < inRoot && bIn > inRoot) || (aIn > inRoot && bIn < inRoot))
        printf("LCA of %d and %d is %d.\n", a, b, in[inRoot]);
    else if (aIn > inRoot && bIn > inRoot)
        lca(inRoot+1, inr, preRoot+1+(inRoot-inl), a, b);
    else if (aIn == inRoot)
            printf("%d is an ancestor of %d.\n", a, b);
    else if (bIn == inRoot)
            printf("%d is an ancestor of %d.\n", b, a);
}
int main() {
    int m, n, a, b;
    scanf("%d %d", &m, &n);
    in.resize(n + 1), pre.resize(n + 1);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &in[i]);
        pos[in[i]] = i;
    }
    for (int i = 1; i <= n; i++) scanf("%d", &pre[i]);
    for (int i = 0; i < m; i++) {
        scanf("%d %d", &a, &b);
        if (pos[a] == 0 && pos[b] == 0)
            printf("ERROR: %d and %d are not found.\n", a, b);
        else if (pos[a] == 0 || pos[b] == 0)
            printf("ERROR: %d is not found.\n", pos[a] == 0 ? a : b);
        else
            lca(1, n, 1, a, b);
    }
    return 0;
}
```

## 1152 Google Recruitment (20 分)

翻译：给出一个l长度的字符串，求出其中第一个k位的素数

思路：素数。字符串转数字，数字转字符串。

答案：

```
#include <iostream>
#include <string>
using namespace std;
bool isPrime(int n) {
    if (n == 0 || n == 1) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}
int main() {
    int l, k;
    string s;
    cin >> l >> k >> s;
    for (int i = 0; i <= l - k; i++) {
        string t = s.substr(i, k);
        int num = stoi(t);
        if (isPrime(num)) {
            cout << t;
            return 0;
        }
    }
    cout << "404\n";
    return 0;
}
```

## 1153 Decode Registration Card of PAT (25 分)

翻译：给出一组学生的准考证号和成绩，准考证号包含了等级(乙甲顶)，考场号，日期，和个人编号信息，并有三种查询方式

思路：map，排序，查询

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
        for (int j = 0; j < ans.size(); j++)
            printf("%s %d\n", ans[j].t.c_str(), ans[j].value);
        if (((num == 1 || num == 3) && ans.size() == 0) || (num == 2 && cnt == 0)) printf("NA\n");
    }
    return 0;
}
```

## 1154 Vertex Coloring (25 分)

翻译：给出一个图（先给出所有边，后给出每个点的颜色），问是否满足：所有的边的两个点的颜色不相同

思路：图论，逻辑题。

答案：

```
#include <iostream>
#include <vector>
#include <set>
using namespace std;
struct node {int t1, t2;};
int main() {
    int n, m, k;
    cin >> n >> m;
    vector<node> v(m);
    for (int i = 0; i < m; i++)
        scanf("%d %d", &v[i].t1, &v[i].t2);
    cin >> k;
    while (k--) {
        int a[10009] = {0};
        bool flag = true;
        set<int> se;
        for (int i = 0; i < n; i++) {
            scanf("%d", &a[i]);
            se.insert(a[i]);
        }
        for (int i = 0; i < m; i++) {
            if (a[v[i].t1] == a[v[i].t2]) {
                flag = false;
                break;
            }
        }
        if (flag) 
            printf("%d-coloring\n", se.size());
        else 
            printf("No\n");
    }
    return 0;
}
```

## 1155 Heap Paths (30 分)

翻译：给出一颗完全二叉树，打印出从根节点到所有叶节点的路径，打印顺序先右后左，即先序遍历的镜像。然后判断该树是大顶堆、小顶堆或者不是堆

思路：堆问题

输出路径dfs

答案：

```
#include <iostream>
#include <vector>

using namespace std;
vector<int> v;
int a[1009], n, isMin = 1, isMax = 1;

// 打印路径 
void dfs(int index) {
    if (index * 2 > n && index * 2 + 1 > n) { // 走到头了，将路径打印出来 
        if (index <= n) {
            for (int i = 0; i < v.size(); i++)
                printf("%d%s", v[i], i != v.size() - 1 ? " " : "\n");
        }
    } else {
    	// 一直向右走
        v.push_back(a[index * 2 + 1]);  
        dfs(index * 2 + 1);
        v.pop_back(); // 将向右走的弹出来 
        
        // 转向左走 
        v.push_back(a[index * 2]);
        dfs(index * 2);
        v.pop_back(); // 将左的弹出来 
    }
}

int main() {
    
	cin >> n; // 序列长度 
    
    // 输入层序遍历序列，从一开始 
    for (int i = 1; i <= n; i++) {
		scanf("%d", &a[i]);
	}
        
    v.push_back(a[1]); // 压入根节点 
    
    // 打印路径 
	dfs(1);
    
    // 判断最大堆还是最小堆 
	for (int i = 2; i <= n; i++) {
        if (a[i/2] > a[i]) isMin = 0; // 父节点大，不是最小堆 
        if (a[i/2] < a[i]) isMax = 0; // 父节点小，不是最大堆
    }
    if (isMin == 1)
        printf("Min Heap");
    else 
        printf("%s", isMax == 1 ? "Max Heap" : "Not Heap"); 
    return 0;
}

```

























































# 分类整理

理解并自己写代码替换柳神的

*编号*：代表理解的比较到位，自己写过一遍了
**编号**：代表理解的不够到位，需要再次理解

---------------------------------------------------------------------------
## 数学问题

### 多项式

多项式加法为，次数相同，系数相加

多项式乘法为，系数相乘，次数相加，逐项累乘并相加

*1002*

次数相等，系数相加，printf("%.1f") 打印小数点技巧

*1009*

乘法，系数相乘，指数相加

### 素数

bool isprime(int n) {
    if(n <= 1) return false;
    int sqr = int(sqrt(n * 1.0));
    for(int i = 2; i <= sqr; i++) {
        if(n % i == 0) {
			return false;
		}
    }
    return true;
}

*1015*

模板代码判断是否是素数

*1059*

```
// 建立素数表，即prime[] = 1的为素数，即不是由相乘得到的即为素数。
for(int i = 2; i * i < 500000; i++)
        for(int j = 2; j * i < 500000; j++)
            prime[j * i] = 0;
```

1152

### 进制转换

p进制转化为十进制，`n += res[i] * pow(d, j)`

十进制转化为p进制，除基取余法，`res[len++] = n % d; n = n / d;`

*1015*

两种相互转化都用到了，还判断了素数

1019

1027

*1058*

这题准确来说不是进制，这题考的是单位转化

1100

### 大整数计算

int最高10位，long long最高18位，超过这个位数，考虑用大整数计算。

存储：低位的在数组的低位，高位的在数组的高位，这样便于进位

四则运算：加法（进位），减法（借位），乘法（进位），除法（从高位开始）

*1023*

加法，从低位向高位加

*1024*

reverse() // string反转

### 科学计数法

数字的顺序不会改变，关注“.”的位置，以及推算10的次数。

**1060**，1073

### 分数的四则运算

算法笔记P156 分数的四则运算

分数的表示：结构体，fraction，up，down

分数的化简：

1. down为负数，分子分母相反
2. up为0，down则为1
3. 分子分母约去最大公约数，gcd

分数的四则运算：常识计算即可

分数的化简：up>down 假分数 即 up/down up%down / down

最大公约数代码

```
// 辗转相除法
int gcd (int a, int b) {
    if (b == 0) return a;
    else return gcd(b, a % b);
}
```

**1081**，1088

--------------------------------------------------------------------------

## 逻辑问题

### 暂定逻辑题

*1006（25分）*

*1007（25分）*

最大子列和，在线处理

可以理解为two pointer

*1008*，1010，*1011*，1031

*1036（25分）*

十分简单

*1042*，1044

1046，

**1049（30分）**

找规律，智力题，没搞懂

1056

*1063*

set的使用方式

1065，1082

**1085（25分）**

从小到大排序，再代入公式。

1091

**1096（因式分解）**

一个数，因数的最大上限为sqrt(N) + 1

1101

1103

*1104（20分）*

找规律，数学问题

1105

*1108（20分）*

```
sscanf() 与 sprintf() 的用法

// 注意第一个参数，都为字符串，视为屏幕
```

1109，1113，1125



*1128*

检测是否符合八皇后

列不同，检测行是否相同，或者对角是否相同

abs应用

1139

1140

1142

1148，1154

### map思想

输入输出总结：

1. stdio.h

```
scanf("%d:%d:%d", &a, &b, &c); // 格式输入

常见格式，%d，%lld，%f，%lf，%c，%s

注：遇到空格直接跳过，%s则是遇到空格停止输入，注意区别。

printf("%d", a); // 格式输出

特殊实用格式：%5d（空格对齐5），%05d（零对齐5），%.2f（浮点数小数点后两位）
```

```
getchar() // 输入单个字符
putchar() // 输出单个字符
```

```
sscanf(str, "%d", &n); // 从左赋到右，字符串变为int
sprintf(str, "%d", n); // 从右赋到左，int变为字符串
```

2. 标准输入输出流

```
cin >> n; // 自动判定为n申请的变量类型
cout << n;
getline(cin, str) // 当str为string类型的时候
```

*1022*，1039，1041，1047


*1048（25分）*

用map标记

1050，1054

*1071（25分）*

1092，1112

*1116*

1. map应用

2. 用set来筛选是否是重复

3. 素数检测

1117，1120


1124，1144，

*1121（25分）*

双向标记

*1149（25分）*

双向标记

### 分类排序题

1. 结构体的写法

```
struct Node {
    int a;
    char b;
    bool c;
} node[10000];

// 注：
1. Node为该结构体的类型名，可以类似于int类型那样使用
2. node为该结构体的一个实体变量，可写。
```

2. 排序算法cmp

```
sort默认从小到大排列

return a > b // 可以理解为当 a > b 时把a放在b前面
```


**1012**，1025，1028，1038，1055，1062

*1070*

单价高的先买，利润最高化

1075，1080，1083，1095，1129

1137，1141，1153

### two pointers

1029

### 贪心算法

1033，1037，1067

### 动态规划

1040，1045，1068

--------------------------------------------------------------------------

## 排队等待问题

*1014（30分）*

1016，1017

**1026（30分）**

排队等待问题，与1014对比，同一类型，加入vip，超难

--------------------------------------------------------------------------
## 字符串处理

### 数字与字符串相互转化

*1001*，1005，

*1069*

stoi() // string转int

to_string() // int转string

s.insert(0, 4 - s.length(), '0') // string插入

1132

### 字符串单纯处理

*1035*，1061，

*1077*

翻转字符串

```
#include <algorithm>

using namespace std;

string s;
reverse(s.begin(), s.end()); // 翻转
```

1084，1093，

*1136*

回文数

1. char与int转化

```
char - '0' // char转化为int
int + '0' // int转化为char 
```

2. string 翻转

reverse(s.begin(), s.end());

3. 大整数加法



--------------------------------------------------------------------------

## hash算法

1078，1145

--------------------------------------------------------------------------
## 线性表

### 链表

*1052*：

1. return a.flag > b.flag // 意味着，flag为true的放在前面，注意这个排序技巧，

2. 将链表放在结构数组中排序的技巧，这样就可以使用sort函数了

1074

*1097（25分）*

用map来标记是否重复

*1133（25分）*

分成不同的区间

*1032*: 

1. 链表的表示方式

```
struct NODE {
    char key;
    int next;
    bool flag;
} list[100000];
```

2. 遍历技巧

```
for(int i = s1; i != -1; i = node[i].next) {
	// 操作
}
```

### 栈

1051，1057

--------------------------------------------------------------------------

## 排序

排序分类：

1. 选择排序 --> 堆排序

选择排序：从i到N-1中选择一个最小的，与第i个位置交换。重复n-1趟，完成排序。

堆排序：通过最大堆排序。

2. 插入排序 --> 希尔排序

插入排序：整理扑克牌

希尔排序：间隔的插入排序，再缩小间隔直到0

3. 冒泡排序 --> 快速排序

冒泡排序：一趟通过交换将最小的交换到第一个，再通过 n - 1趟，完成排序

快速排序：分而治之，选一个主元，整个序列，左边小于主元，右边大于主元。后面左边再递归，右边再递归。

4. 归并排序

归并排序：分而治之，通过 two pointer的merge函数，将序列分成多份后merge。

**1089**（25分）

插入排序

归并排序

**1098**（25分）

插入排序

堆排序

堆排序部分没看懂


--------------------------------------------------------------------------
## 堆

堆：完全二叉树存储（数组），最大堆（根大），最小堆（根小）

堆的插入：通过对比，将新的数交换到对应的位置

完全二叉树：父节点为i/2，左子树为2i，右子树为2i+1（起始为0，则index * 2 + 1为左子树，index * 2 + 2为右子树）

*1147*（30分）

给一个树的层序遍历，判断它是不是堆，是大顶堆还是小顶堆。输出这个树的后序遍历

*1155*（30分）

输出路径



--------------------------------------------------------------------------
## 树

### 树的遍历，先序，中序，后序，层序

图的dfs可类比为树的先序遍历

图的bfs可类比为树的层序遍历

*1004*，*1094*

这两个及其相似

vector数组，可以用于记录树及其子树

```
vector<int> v[100]
```

*1090*

dfs算法，及其这题的树的表示法。

寻找供应链最高价格的零售商

*1106（25分）*

寻找供应链中最便宜的零售商

**1102**

是道很好的题目综合性很强。

*1110*

若maxn等于n，即为完全二叉树

1115，1119

*1130*

输出中缀表达式。

精华为递归组成答案，一层套一层。

1135，1143，1151

### 两个序列确定一棵树

1020，1086，1138

*1127*

1. 中序后序构建出树（dfs）
2. 层序遍历（bfs）
3. 每层一个数组，分为奇层与偶层

### BST（二叉搜索树）

BST：二叉搜索树

特点：左子树小于根节点，右子树大于根节点

**1043（25分）**

**1064（30分）**

BST的中序遍历为递增序列

*1099（30分）*

数列从小到大排序，排序树的中序遍历一定为递增序列 

以这个性质为线索

### AVL树

1066，1123

--------------------------------------------------------------------------
## 图

### 最短路径，Dijkstra算法

1003，1018，1030，1072

**1111**

复杂题：Dijkstra + DFS

最主要要理解Dijkstra，接着就是重复两个Dijkstra，但是权值不同而已

### 图的遍历，DFS，BFS

1018，1021，1030，1053，1076，1079，1087

1131，1134

1122，1150

*1126（25分）*

读懂题意

### 连通分量

1013，1021，1034

--------------------------------------------------------------------------

## 并查集

1107，1114，1118

--------------------------------------------------------------------------

## 拓扑排序

1146


