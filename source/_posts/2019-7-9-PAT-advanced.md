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

## 1001 A+B Format (20 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805528788582400

翻译：计算a+b并以标准格式输出和，格式为数字必须每三个用逗号隔开（除非四位数以下）

思路：将数字转化为字符串处理（to_string）。之后处理字符串即可。

答案：

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

## 1002 A+B for Polynomials (25 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805526272000000

翻译：polynomials（多项式）。将A与B两个多项式相加，K为非零项的个数，Ni为指数，Ani为系数。

思路：引入c数组，key为指数，value为系数。多项式加法为，指数相同的系数相加。

答案：

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

思路：遍历，对比保存最早signIn与最晚signOut的人的id。

答案：

```
#include<string>
#include<cstdio>
#include<iostream>
#include <climits>
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
            minn = tempIn;
            unlocked = t;
        }
        if (tempOut > maxn) {
            maxn = tempOut;
            locked = t;
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
			ans[j + a] += arr[j] * b; // 系数相乘，指数相加 
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

## 1010 Radix (25 分)**

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

思路：不用太理解说什么，直接按照题目给的公式计算就好了。

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
	ans = (ans*0.65-1)*2;
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
        stu[i].score[0] = (stu[i].score[1] + stu[i].score[2] + stu[i].score[3]) / 3.0 + 0.5;
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
            printf("%d %c\n", stu[temp-1].rank[best], c[best]);
        } else {
            printf("N/A\n");
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

## 1014 Waiting in Line (30 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805498207911936

翻译：

思路：

答案：

```
```


