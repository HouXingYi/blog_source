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

## 1014 **Waiting in Line (30 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805498207911936

翻译：N个窗口，每个窗口可以排M个人，8点开始服务，17点关门。队都排满了在黄线外等候，若有空位，则进入最短的队，若同时则选最小的窗口。求某个人的服务结束时间。

思路：首先理解题目。利用队列模拟。

答案：

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

## 1015 Reversible Primes (20 分)

https://pintia.cn/problem-sets/994805342720868352/problems/994805495863296000

翻译：可翻转的素数是，本身是个素数，在某种进制下翻转后还是素数。

思路：先检查本身是否是素数，接着把数字转化为指定的进制，翻转后，再转化为10进制，查看是否为素数。

考点：素数的检查，把十进制转化为d进制：除基取余法，把d进制转化为十进制：累乘累加

答案：

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

思路：考察map的思想，一个分类给一个map。

自己动手做一遍

答案：

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

## 1023 Have Fun with Numbers (20 分)

翻译：翻倍一个k位数的数字，看是否翻倍的数字中的数字排列是否和原来的一样。

思路：大整数计算。理解题意。

答案：

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

疑问：柳这种方式全面吗？王道P56页有不同的做法。

答案：

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

## 1043 Is It a Binary Search Tree (25 分)

翻译：

思路：

答案：

```
```




