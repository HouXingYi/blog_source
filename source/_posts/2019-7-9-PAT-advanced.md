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

翻译：

思路：

答案：

```
```
