#coding=utf8
import os
import sys

s = ''
table_begin = False
for line in open('txt2'):
	line = line.strip('\r\n')
	'''
	if 'T-INK-cell lymphoma' in line and  'Prior therapy for T-/NK-cell lymphoma' in line:
		table_begin = True
		s +='<table>'
	if table_begin:
		parts = line.split('')
	'''
	if '<' in line:
		s += line
	else:
		s += '<p>' + line.replace(' ', '&nbsp;') + '</p>'

print (s)	
