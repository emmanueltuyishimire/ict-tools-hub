'use server';
/**
 * @fileOverview An AI-powered tool recommendation system.
 *
 * - aiToolRecommendation - A function that handles the tool recommendation process.
 * - AiToolRecommendationInput - The input type for the aiToolRecommendation function.
 * - AiToolRecommendationOutput - The return type for the aiToolRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiToolRecommendationInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task or problem the user is trying to solve.'),
});
export type AiToolRecommendationInput = z.infer<typeof AiToolRecommendationInputSchema>;

const AiToolRecommendationOutputSchema = z.object({
  recommendedTools: z.array(z.string()).describe('An array of recommended ICT tools from the ICT Toolbench suite.'),
  reasoning: z.string().describe('The reasoning behind the tool recommendations.'),
});
export type AiToolRecommendationOutput = z.infer<typeof AiToolRecommendationOutputSchema>;

export async function aiToolRecommendation(input: AiToolRecommendationInput): Promise<AiToolRecommendationOutput> {
  return aiToolRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiToolRecommendationPrompt',
  input: {schema: AiToolRecommendationInputSchema},
  output: {schema: AiToolRecommendationOutputSchema},
  prompt: `You are an expert ICT tool recommendation system. Based on the user's task description, you will suggest the most appropriate tools from the ICT Toolbench suite.

Task Description: {{{taskDescription}}}

Consider the following ICT Toolbench suite:
1️⃣ Networking & IP Tools
IP Address to Binary Converter, Binary to IP Address Converter, Subnet Calculator (CIDR / hosts / networks), Subnet Mask Converter, VLSM Calculator, Network Bandwidth Estimator, Ping / Latency Estimator, Data Transfer Time Calculator, MAC Address Validator, Port Number Lookup, Network Mask Validator, Public vs Private IP Checker, IP Class Finder, IP Range Generator, Broadcast Address Calculator, Host Count Calculator, Network Address Calculator, CIDR to Subnet List Generator, CIDR to Wildcard Mask Converter, IP Summarization Tool
2️⃣ Web & Server Tools
HTTP Header Checker, HTTP Status Code Checker, SSL Certificate Expiration Checker, URL Encoder / Decoder, HTML Entity Encoder / Decoder, HTML / CSS / JS Minifier, Robots.txt Validator / Generator, Sitemap Generator (static), Response Time Calculator, Domain Expiration Countdown, SSL Checker, Server Uptime Calculator, DNS Lookup Tool, Reverse DNS Lookup, Whois Lookup (static/free DB), Webpage Load Time Estimator, Cache Expiration Calculator, Compression Savings Estimator, CDN Bandwidth Estimator, HTTP Request Size Calculator
3️⃣ Programming & Code Utilities
Code Formatter / Beautifier (JS, Python, HTML, CSS), JSON Formatter / Validator, Regex Tester / Generator, Base64 Encoder / Decoder, Hex ↔ RGB Color Converter, Binary ↔ Decimal ↔ Hex Converter, MD5 / SHA Hash Generator, ROT13 Encoder / Decoder, Caesar Cipher Encoder / Decoder, Time Complexity Estimator (Big O calculator), Prime Number Checker, Fibonacci Sequence Generator, Factorial Calculator, Algorithm Step Simulator (simple sorting / searching), Random String Generator, Random Number Generator, Code Snippet Formatter, Variable Name Validator, Function / Formula Tester (JS/Python), Unicode / ASCII Converter
4️⃣ Security & Password Tools
Password Strength Checker, Password Generator (customizable), Hash Generator (MD5, SHA1, SHA256), Encryption / Decryption Tool (AES, Caesar cipher), Two-Factor Auth TOTP Demo (educational), Base32 / Base58 Encoder / Decoder, File Integrity Checker (checksum generator), Random Key Generator, Private / Public Key Pair Generator (educational), Secure Token Generator, OTP Generator, Password Expiry Reminder Calculator, Password Entropy Calculator, Salting / Hashing Demo Tool, Simple Cipher Cracker (educational), Hex to Binary Password Converter, Binary to ASCII Password Converter, Random PIN Generator, Credential Strength Analyzer, Security Quiz Tool
5️⃣ Cloud & Storage Tools
Cloud Storage Cost Estimator, Bandwidth Cost Calculator, Backup Storage Requirement Calculator, Data Compression Calculator (gzip / zip size estimator), VM RAM & CPU Requirement Estimator, Disk Usage / Partition Estimator, Cloud Instance Cost Calculator, Network Transfer Cost Estimator, Storage vs Memory Cost Analyzer, File Conversion Estimator (MB → GB / compressed), Data Retention Period Calculator, Snapshot / Backup Scheduler, Storage Growth Estimator, RAID Storage Calculator, Cloud Migration Estimator, Cloud Sync Time Calculator, VM Scaling Calculator, Storage Redundancy Calculator, Virtual Disk Size Estimator, IOPS Calculator
6️⃣ Database & Admin Tools
SQL Query Tester (basic), Database Row / Storage Estimator, Uptime / Availability Calculator, Backup Schedule Calculator, Data Retention Period Calculator, Replication / Sharding Estimator, User Quota Calculator, Transaction / TPS Calculator, Log Rotation Calculator, Data Migration Estimator, Database Index Size Calculator, Query Execution Time Estimator, Database Growth Calculator, Primary / Foreign Key Validator, Normalization Checker, Duplicate Row Finder, Table Size Estimator, Column Type Converter, SQL Injection Tester (educational), Database Health Checker
7️⃣ Networking Education & Learning Tools
CIDR / Subnet Practice Generator, IP Quiz / Practice Tool, Network Topology Mapper (static), Port Scanner (educational), DNS Lookup Simulator, OSI Layer Quiz Tool, Packet Size Estimator, Firewall Rule Simulator, VPN Bandwidth Estimator, MAC Address Quiz Tool, Network Mask Quiz, IP Class Quiz, Broadcast Address Quiz, Host Calculation Quiz, Subnetting Challenge Tool, Routing Table Simulator, NAT Simulation Tool, VLAN ID Calculator, IP Summary Quiz, DNS Zone File Quiz
8️⃣ Programming Learning Tools
Big-O Complexity Quiz Tool, Algorithm Visualizer (sorting/searching), Recursion Calculator / Simulator, Logic Gate Simulator, Truth Table Generator, Boolean Algebra Simplifier, Graph Adjacency Calculator, Matrix Operation Calculator, Factorial / Combinatorics Calculator, Fibonacci Sequence Generator, Prime Number Generator, Binary Tree Simulator, Linked List Visualization Tool, Stack / Queue Simulator, Hash Table Simulator, Search Algorithm Tester, Sorting Algorithm Tester, Heap Calculator / Simulator, Trie Simulator, Binary Search Tree Visualizer
9️⃣ ICT Daily Utility Tools
QR Code Generator (text / URL), ASCII ↔ Unicode Converter, Markdown Previewer / Converter, CSV ↔ JSON Converter, Text Case Converter (UPPER / lower / Title), Word / Character Counter, Random Password / Key Generator, Random String / Number Generator, IP Location Lookup (static DB), Color Picker & HEX / RGB Converter, Dice Roller (for coding / randomization), Coin Flip Simulator, Pomodoro Timer, Countdown / Timer Generator, File Size / Download Time Calculator, Bandwidth Usage Tracker (static calculator), Hostname ↔ IP Lookup, Network Packet Estimator, ASCII Art Generator, Emoji / Symbol Picker
10️⃣ Miscellaneous ICT Tools
Base Conversion Tool (bin/dec/hex/oct), URL Shortener (local / static), Base32 / Base58 Encoder / Decoder, Hex Color Code Analyzer, Binary Pattern Finder, Random MAC Address Generator, Random IPv6 Generator, Simple File Encryption / Decryption, CSV / Excel Analyzer (basic formulas), Code Snippet Sharing Tool, Code Diff Checker, Algorithm Step Logger, Syntax Highlighter / Preview, Markdown to HTML Converter, CSS Grid Generator, Flexbox Layout Generator, JSON to CSV Converter, CSV to JSON Converter, HTML Table Generator from CSV, IP Ping Simulator

Respond with the recommended tools and the reasoning behind your recommendations.
`,
});

const aiToolRecommendationFlow = ai.defineFlow(
  {
    name: 'aiToolRecommendationFlow',
    inputSchema: AiToolRecommendationInputSchema,
    outputSchema: AiToolRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
