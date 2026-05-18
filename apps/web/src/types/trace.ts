export interface TraceSpan {
  spanId: string;
  parentSpanId?: string | null;
  service: {
    id: string;
    name: string;
    type: string;
  };
  metrics: {
    latency: number;
    method?: string;
    path?: string;
    statusCode?: number;
    size?: number;
  };
  status: string;
  timestamp: string;
}

/*
Example Trace Record:
{
  "traceId": "trace_abc123",
  "rootSpanId": "span_root",
  "spans": [
    {
      "spanId": "span_root",
      "service": { "id": "svc_gateway", "name": "API Gateway", "type": "gateway" },
      "metrics": { "latency": 120, "method": "GET", "path": "/payments" },
      "status": "success",
      "timestamp": "2024-01-10T12:00:00Z"
    }
  ]
}
*/

export interface TraceGraph {
  nodes: Array<{ id: string; data: { label: string; latency: number; status: string } }>;
  edges: Array<{ id: string; source: string; target: string; label: string }>;
}

export interface TraceRecord {
  traceId: string;
  rootSpanId: string;
  spans: TraceSpan[];
  graph: TraceGraph;
}
