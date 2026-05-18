import { TraceModel } from "../models/Trace";
import { TraceEventInput } from "../types/event";

export const upsertTraceSpan = async (event: TraceEventInput) => {
  const rootSpanId = event.parentSpanId ? event.parentSpanId : event.spanId;
  const trace = await TraceModel.findOne({
    projectId: event.projectId,
    traceId: event.traceId
  });

  if (!trace) {
    return TraceModel.create({
      projectId: event.projectId,
      traceId: event.traceId,
      rootSpanId,
      spans: [
        {
          spanId: event.spanId,
          parentSpanId: event.parentSpanId ?? null,
          service: event.service,
          metrics: event.metrics,
          status: event.status,
          timestamp: new Date(event.timestamp ?? Date.now())
        }
      ]
    });
  }

  trace.spans.push({
    spanId: event.spanId,
    parentSpanId: event.parentSpanId ?? null,
    service: event.service,
    metrics: event.metrics,
    status: event.status,
    timestamp: new Date(event.timestamp ?? Date.now())
  });

  await trace.save();
  return trace;
};

export const listTraces = async (projectId: string, limit = 20) => {
  return TraceModel.find({ projectId }).sort({ updatedAt: -1 }).limit(limit).lean();
};

export const getTraceById = async (projectId: string, traceId: string) => {
  return TraceModel.findOne({ projectId, traceId }).lean();
};

export const buildTraceGraph = (trace: { traceId: string; spans: any[] }) => {
  const nodes = trace.spans.map((span) => ({
    id: span.spanId,
    data: {
      label: span.service.name,
      latency: span.metrics.latency,
      status: span.status
    }
  }));

  const edges = trace.spans
    .filter((span) => span.parentSpanId)
    .map((span) => ({
      id: `${span.parentSpanId}-${span.spanId}`,
      source: span.parentSpanId,
      target: span.spanId,
      label: `${span.metrics.latency}ms`
    }));

  return { nodes, edges };
};
